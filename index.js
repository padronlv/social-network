const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });
const compression = require('compression');
const db = require('./db/db');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const bc = require('./bc/bcrypt');
const csurf = require('csurf');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./s3');
const config = require('./config');

app.use(cookieParser());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// app.get('/user', async(req, res) => )

app.get('/user', function(req, res) {
    db.getYourUserInfo(req.session.userId).then(
        data => {
            // console.log("data get your user info ", data);
            res.json({
                ...data,
                profile_pic: data.profile_pic || '/images/default.png'

            });
        }).catch(error => {
        console.log(error);
    });
});

app.get('/friendsList', function(req, res) {
    // console.log("app get friendsList");
    db.getYourFriends(req.session.userId)
        .then(
            data => {
                console.log("get your friends ", data);
                res.json(data);
            })

        .catch(error => {
            console.log("error in get your friends", error);
        });
});

app.get('/friendship/:id', function(req, res) {
    db.checkFriendship(req.session.userId, req.params.id)
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(error => {
            console.log(error);
        });
});

app.post('/friendship/:id', (req, res) => {
    // console.log("post request friendship", req.body);
    if (req.body.friendshipStatus == 'friends') {
        db.deleteFriendship (req.session.userId, req.params.id)
            .then(UpdatedFriendshipInfo => {
                // console.log(image);
                res.json ({
                    success: true,
                    status: null,
                    buttonText: 'send a friend request',
                    info: UpdatedFriendshipInfo
                });
            }).catch(
                () => res.sendStatus(500)
            );

    } else if (req.body.friendshipStatus == 'pendingAsReceiver') {
        db.acceptFriendshipRequest (req.session.userId, req.params.id)
            .then(UpdatedFriendshipInfo => {
                // console.log(image);
                res.json ({
                    success: true,
                    status: 'friends',
                    buttonText: 'unfriend',
                    info: UpdatedFriendshipInfo
                });
            }).catch(
                () => res.sendStatus(500)
            );

    } else if (req.body.friendshipStatus == 'pendingAsSender') {
        db.cancelFriendshipRequest (req.session.userId, req.params.id)
            .then(UpdatedFriendshipInfo => {
                // console.log(image);
                res.json ({
                    success: true,
                    status: null,
                    buttonText: 'send a friend request',
                    info: UpdatedFriendshipInfo
                });
            }).catch(
                () => res.sendStatus(500)
            );
    } else {
        db.insertFriendshipRequest (req.session.userId, req.params.id)
            .then(UpdatedFriendshipInfo => {
                // console.log(image);
                res.json ({
                    success: true,
                    status: 'pendingAsSender',
                    buttonText: 'Cancel request for friendship',
                    info: UpdatedFriendshipInfo
                });
            }).catch(
                () => res.sendStatus(500)
            );
    }
});


app.get('/logout', (req, res) => {
    req.session.userId = null;
    res.redirect("/welcome");
});



app.get('/user/:id.json', function(req, res) {
    if (req.session.userId == req.params.id) {
        res.json({
            redirect: '/'
        });
    } else {
        db.getYourUserInfo(req.params.id).then(
            data => {
                // console.log("working");
                res.json({
                    ...data,
                    profile_pic: data.profile_pic || '/images/default.png'

                });
            }).catch(error => {
            console.log(error);
        });
    }
});

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.post('/upload', uploader.single('file'), s3.upload, (req, res) => {
    db.addImage(req.session.userId, config.s3Url + req.file.filename
    ).then(userWithUpdatedImage => {
        // console.log(image);
        res.json ({
            success: true,
            image: userWithUpdatedImage.profile_pic
        });
    }).catch(
        () => res.sendStatus(500)
    );
});

app.post('/uploadBio', (req, res) => {
    db.addBio(req.session.userId, req.body.bio
    ).then(userUpdatedBio => {
        // console.log(image);
        res.json ({
            success: true,
            info: userUpdatedBio
        });
    }).catch(
        () => res.sendStatus(500)
    );
});



app.post('/registration', (req, res) => {
    if (
        req.body.firstName == ""
        || req.body.lastName == ""
        || req.body.email == ""
        || req.body.password == ""
    ) {
        console.log("empty");
        return res.json({
            error: "Please, fill in all the fields"
        });
    } else {
        console.log("inside POST /registration", req.body);
        bc.hashPassword(req.body.password)
            .then(hashedPassword => {
                console.log("hashedPassword: ", hashedPassword);
                db.insertUser(req.body.firstName, req.body.lastName, req.body.email, hashedPassword)
                    .then(newUser => {
                        req.session.userId = newUser.id;
                        // console.log(req.session.userId);
                        // console.log(newUser);
                        // res.redirect('/profile');
                        return res.json(newUser);
                    }).catch((error) => {
                        console.log(error);
                        return res.json({
                            error : "Your Email is already taken, please try again"
                        });
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
});

app.post('/login', (req, res) => {
    db.getYourUserByEmail(req.body.email)
        .then(user => {
            if(user == undefined) {
                console.log("posting is working");
                res.json({
                    error: "The Email doesn't match any user"
                });
            } else {
                bc.checkPassword(req.body.password, user.hashed_password)
                    .then(doThePasswordsMatch => {
                        console.log("doThePasswordsMatch: ", doThePasswordsMatch);
                        if (doThePasswordsMatch) {
                            req.session.userId = user.id;
                            res.json(user);
                        } else {
                            console.log("false password page");
                            res.json({
                                error: "The password is wrong, please try again"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        })
        .catch(err => {
            console.log(err);
        });
});



app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});



app.get('*', requireUser, function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

function requireUser(req, res, next) {
    if (!req.session.userId) {
        res.redirect("/welcome");
        // res.status(403).json({ success: false });
    } else {
        next();
    }
}
server.listen(8080, function() {
    console.log("I'm listening.");
});

let onlineUsers = {};
let chatMessages = [];

io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    console.log(`socket with the id ${socket.request.session.userId} is now connected`);
    onlineUsers[socket.id]= socket.request.session.userId;
    // console.log(onlineUsers);
    db.getUsersByIds(Object.values(onlineUsers)).then(users => {
        console.log('users in dbquery for socket', users);
        socket.emit("onlineUsers", users);

    });
    socket.emit("chatMessages", chatMessages);

    if (
        Object.values(onlineUsers).filter(id => id == socket.request.session.userId).length == 1
    ) {
        db.getYourUserInfo(socket.request.session.userId).then(
            data => {
                socket.broadcast.emit("userJoined", data);
                // console.log("data get your user info ", data);

            }).catch(error => {
            console.log(error);
        });

    }
    socket.on('disconnect', function() {

        if (
            Object.values(onlineUsers).filter(id => id == socket.request.session.userId).length == 1
        ) {
            db.getYourUserInfo(socket.request.session.userId).then(
                data => {
                    socket.broadcast.emit("userLeft", data);
                    // console.log("data get your user info ", data);

                }).catch(error => {
                console.log(error);
            });

        }
        delete onlineUsers[socket.id];
        // io.emit('userLeft', userId);
        console.log(`socket with the id ${socket.id} is now disconnected`);

    });

    socket.on('newMessage', function (newMessage) {
        let completNewMessage = {
            userId: socket.request.session.userId,
            content: newMessage,
            date: new Date()
        };

        chatMessages = [...chatMessages, completNewMessage]
        io.sockets.emit('newMessageBack', completNewMessage);

    })



    // socket.on('thanks', function(data) {
    //     console.log(data);
    // });
    // io.sockets.emit (for everyone)
    // io.sockects.socket[.....] (for someone)



    // socket.emit('welcome', {
    //     message: 'Welome. It is nice to see you'
    // });

    // socket.on('chatMsg', data => {
    //     store.dispatch();
    // });
    // socket.on('privateMessage', data => {
    //     io.sockets.sockets[data.socketId].emit('privateMessage'),
    // })
});
