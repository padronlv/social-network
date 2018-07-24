const express = require('express');
const app = express();
const compression = require('compression');
const db = require('./db/db');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const csurf = require('csurf');
// const bc = require('./bc/bcrypt');

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

app.post('/registration', (req, res) => {
    console.log("inside POST /registration", req.body);
    // bc.hashPassword(req.body.password)
    //     .then(hashedPassword => {
    //         console.log("hashedPassword: ", hashedPassword);
    //         db.insertUser(req.body.firstname, req.body.lastname, req.body.email, hashedPassword)
    //             .then(newUser => {
    //                 // req.session.userId = newUser.id;
    //                 console.log(req.session.userId);
    //                 // console.log(newUser);
    //                 // res.redirect('/profile');
    //                 res.json(newUser)
    //             }).catch(() => {
    //                 res.json({
    //                     error : "You have not filled in all the required fields or your Email is already taken, please try again"
    //                 });
    //             });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
})


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
