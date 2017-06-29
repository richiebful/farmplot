const mysql = require("mysql");
const crypto = require("crypto");
const extend = require("underscore").extend;
const cloud = require("./cloud.js")
const mysqlConnection = require("./config.js").mysqlConnection
require("date-utils");

const SALT_ITERATIONS = 10000;
const HASH_BYTE_LENGTH = 64;

function asyncSignup(req, res) {
        req.checkBody('email', 'Email is invalid').isEmail();
        req.checkBody('password', "Password must be at least 12 characters").isLength({ min: 12, max: 255 });
        req.checkBody('password', "Passwords don't match").equals(req.body.password2);

        return new Promise((resolve) => {
                req.getValidationResult().then((result) => {
                        if (!result.isEmpty()) {
                                throw result.array()[0];
                        }
                        else {
                                newUser(req.body.email, req.body.password).then((user) => {
                                        user.addToDatabase().then((success) => {
                                                resolve(user)
                                        }).catch((err) => {
                                                throw err;
                                        });
                                }).catch((err) => {
                                        throw err;
                                });
                        }
                })
        })
}

function signupUserErrors(error, res) {
        res.send("signupError")
}

function newUser(email, password) {
        return new Promise((resolve, reject) => {
                const salt = crypto.randomBytes(16)
                crypto.pbkdf2(password, salt, SALT_ITERATIONS, HASH_BYTE_LENGTH, 'sha512', (err, hash) => {
                        if (err) throw err;
                        resolve(extend(Object.create(userPrototype), {
                                email,
                                password: hash,
                                salt,
                                confirmation_token: crypto.randomBytes(32),
                                token_expiration: new Date().addHours(24)
                        }));
                });
        });
}

function confirmUserWithToken(token, callback){
        var conn = mysql.createConnection(mysqlConnection);

        const addNewUserQuery = "UPDATE Users SET email_confirmed = true, confirmation_token=NULL, token_expiration=NULL WHERE confirmation_token = ? AND token_expiration < ?";
        var query = conn.query(addNewUserQuery, [token, new Date()], function (err, results) {
                if (err)
                        callback(err, false)
                else if (results.changedRows > 0)
                        callback(null, true)
                else
                        callback(null, false)
        });
        console.log(query.sql)

        conn.end();
}

confirmUserWithToken(new Buffer("RichardFulop"), () =>{console.log("done")})

function getUserByEmail(email, callback) {
        var conn = mysql.createConnection(mysqlConnection);

        const addNewUserQuery = "SELECT * FROM Users WHERE email = ?";
        conn.query(addNewUserQuery, [email], function (err, results) {
                if (err)
                        callback(err, null)
                else if (results[0] && results[0].email_confirmed == true)
                        callback(null, extend(Object.create(userPrototype), results[0]))
                else if (results[0])
                        callback(new Error("ERR_EMAIL_NOT_CONFIRMED"), null)
                else
                        callback(null, null)
        });

        conn.end();
}

var sessionPrototype = {
        user_id: null, //int
        session_id: null, //int
        expires: null, //int(11) unsigned
        data: null //text
}

var userPrototype = {
        username: "",
        password: null,
        salt: null,
        confirmation_token: null,
        token_expiration: null,
        email: "",
        addToDatabase: function addToDatabase() {
                return new Promise((resolve, reject) => {
                        var conn = mysql.createConnection(mysqlConnection);

                        const addNewUserQuery = "INSERT INTO Users (email, password, salt, confirmation_token) VALUES(?, ?, ?, ?)";
                        const queryParams = [this.email, this.password, this.salt, this.password]
                        var query = conn.query(addNewUserQuery, queryParams, function (err, results) {
                                if (err) throw err;
                                else {
                                        resolve(results);
                                }
                        });

                        conn.end();
                });
        },
        validPassword: function validPassword(attempt) {
                return new Promise((resolve, reject) => {
                        crypto.pbkdf2(attempt, this.salt, SALT_ITERATIONS, HASH_BYTE_LENGTH, 'sha512', (err, hash) => {
                                if (err) throw err;
                                console.log(this.password)
                                console.log(hash)
                                resolve(crypto.timingSafeEqual(hash, this.password))
                        });
                });
        }
};

/*newUser("user2@domain.com", "password").then((user) => {
    console.log(user.password.length)
    user.addToDatabase().then((result) => {
        console.log(result);
    })
})*/


/*getUserByEmail("user2@domain.com").then((user) => {
    user.validPassword("failure").then((result) => {
        console.log(result);
    })
    user.validPassword("password").then((result) => {
        console.log(result);
    })
})*/

module.exports = {
        asyncSignup,
        userPrototype,
        getUserByEmail,
        defaultConnection,
        confirmUserWithToken
}

//createNewUser("richardbfulop@gmail.com", "thisPwdGreat")