const spicedPg = require('spiced-pg');
var db;

if(process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg('postgres:Victor:postgres@localhost:5432/socialnetwork');
}




module.exports.insertUser = function (firstName, lastName, email, password) {
    const q = `
        INSERT INTO users (first_name, last_name, email, hashed_password)
            VALUES ($1, $2, $3, $4)
            RETURNING *
    `;
    const params = [ firstName || null , lastName || null, email || null, password || null];
    return db.query(q, params)
        .then(results => {
            console.log(results.rows);
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};



module.exports.editUserPassword = function (userId, firstName, lastName, email, password) {
    const q = `
        UPDATE users
        SET first_name = $2, last_name = $3, email = $4, hashed_password = $5
        WHERE id = $1
        RETURNING *
    `;
    const params = [userId || null, firstName || null , lastName || null, email || null, password || null];
    return db.query(q, params)
        .then(results => {
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};

module.exports.editUserNoPassword = function (id, firstName, lastName, email) {
    const q = `
        UPDATE users
        SET first_name = $2, last_name = $3, email = $4
        WHERE id = $1
        RETURNING *
    `;
    const params = [id || null, firstName || null , lastName || null, email || null];
    return db.query(q, params)
        .then(results => {
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};

module.exports.editProfile = function (userId, age, city, url) {
    const q = `
    INSERT INTO profiles (user_id, age, city, url)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (user_id)
    DO UPDATE SET age = $2, city = $3, url = $4
    RETURNING *
    `;
    const params = [userId || null , parseInt(age) || null, city || null, url || null];
    console.log(userId, parseInt(age), city, url);
    return db.query(q, params)
        .then(results => {
            return results.rows[0];
        })
        .catch(err => {
            console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};




module.exports.getYourUserByEmail = function (email) {
    const q = `
        SELECT * FROM users WHERE email = $1
    `;
    const params = [email];
    return db.query(q, params)
        .then(results => {
            return results.rows[0];
        });
};

module.exports.getYourUserInfo = function (userId) {
    const q = `
    SELECT *
    FROM users
    WHERE users.id = $1
    `;
    const params = [userId];
    return db.query(q, params)
        .then(results => {
            return results.rows[0];
        });
};

module.exports.getYourFriends = function (userId) {
    const q = `
         SELECT users.id, users.first_name, users.last_name, users.profile_pic, friendships.status
         FROM friendships
         JOIN users
         ON (status = 1 AND receiver_id = $1 AND sender_id = users.id)
         OR (status = 2 AND receiver_id = $1 AND sender_id = users.id)
         OR (status = 2 AND sender_id = $1 AND receiver_id = users.id)
     `;
    const params = [userId];
    return db.query(q, params)
        .then(results => {
            return results.rows;
        });
};

module.exports.addImage = function (userId, url) {
    const q = `
    UPDATE users
    SET profile_pic = $2
    WHERE id = $1
    RETURNING *
    `;
    const params = [ userId || null , url || null];
    return db.query(q, params)
        .then(results => {
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};

module.exports.addBio = function (userId, bio) {
    const q = `
    UPDATE users
    SET bio = $2
    WHERE id = $1
    RETURNING *
    `;
    const params = [ userId || null , bio || null];
    return db.query(q, params)
        .then(results => {
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};

module.exports.checkFriendship = function (senderId, receiverId) {
    const q = `
    SELECT * FROM friendships
    WHERE ((sender_id =$1 AND receiver_id =$2)
    OR (sender_id = $2 AND receiver_id = $1))
    `;
    const params = [ senderId || null , receiverId || null];
    return db.query(q, params)
        .then(results => {
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};
module.exports.insertFriendshipRequest = function (senderId, receiverId) {
    const q = `
        INSERT INTO friendships (sender_id, receiver_id)
            VALUES ($1, $2)
            RETURNING *
    `;
    const params = [ senderId || null , receiverId || null];
    return db.query(q, params)
        .then(results => {
            console.log(results.rows);
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};

module.exports.acceptFriendshipRequest = function (senderId, receiverId) {
    const q = `
    UPDATE friendships
    SET STATUS = 2
    WHERE  ((sender_id =$1 AND receiver_id =$2)
    OR (sender_id = $2 AND receiver_id = $1))
    RETURNING *
    `;
    const params = [ senderId || null , receiverId || null];
    return db.query(q, params)
        .then(results => {
            console.log(results.rows);
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};

module.exports.cancelFriendshipRequest = function (senderId, receiverId) {
    const q = `
    DELETE FROM friendships
    WHERE  ((sender_id =$1 AND receiver_id =$2)
    OR (sender_id = $2 AND receiver_id = $1))
    `;
    const params = [ senderId || null , receiverId || null];
    return db.query(q, params)
        .then(results => {
            console.log(results.rows);
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};

module.exports.deleteFriendship = function (senderId, receiverId) {
    const q = `
    DELETE FROM friendships
    WHERE  ((sender_id =$1 AND receiver_id =$2)
    OR (sender_id = $2 AND receiver_id = $1))
    `;
    const params = [ senderId || null , receiverId || null];
    return db.query(q, params)
        .then(results => {
            console.log(results.rows);
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};

module.exports.getUsersByIds = function(arrayOfIds) {
    const query = `SELECT * FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds])
        .then(results => {
            console.log(results.rows);
            return results.rows;
        });
};
