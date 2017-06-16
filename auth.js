const mysql = require("mysql");
const crypto = require("crypto");
const extend = require("underscore").extend;

const defaultConnection = {
    host: "localhost",
    database: "fplot",
    user: "root",
    password: "050L|tLeT95$="
};

function asyncSignup(req,res){
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('password', "Password must be at least 12 characters").isLength({min: 12, max: 255});
    req.checkBody('password', "Passwords don't match").equals(req.body.password2);

    var errors = req.validationErrors();
    if (errors){
        console.log(errors);
        return errors;
    }
    else{
        return newUser(req.body.email, req.body.password);
    }
}

function newUser(email, password){
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(128);
        crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, hash) => {
            if (err) throw err;
            resolve(extend(Object.create(userPrototype), {
                email,
                password: hash,
                salt
            }));
        });
    });
}

function getUserByEmail(email){
    return new Promise((resolve, reject) => {
        var conn = mysql.createConnection(defaultConnection);
        const addNewUserQuery = "SELECT * FROM Users WHERE email = ?";
        conn.query(addNewUserQuery, [email], function(err, results){ 
            if (err) reject(err);
            if (results[0])
                resolve(extend(Object.create(userPrototype), results[0]));
            else
                resolve(null);
        });
        conn.end();
    });
}

var userPrototype = {
    username: "",
    password: null,
    salt: null,
    email: "",
    addToDatabase: (connectOptions) => {
        return new Promise((resolve, reject) => {
            var conn = mysql.createConnection(connectionOptions);

            const addNewUserQuery = "INSERT INTO Users (email, password, salt) VALUES("+mysql.escape(this.email)+",0x"+this.password.toString("hex")+",0x"+this.salt.toString("hex")+")";
            conn.query(addNewUserQuery, function(err, results){
                if (err) reject(err);
                else {
                    resolve(true);
                }
            });

            conn.end();
        });
    },
    validPassword: (attempt) => {
        console.log(this);
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(attempt, this.salt, 10000, 512, "sha-512", (error, key) => {
                if (error) reject(error);
                resolve(crypto.timingSafeEqual(key, this.password));
            });
        });
    }
};

module.exports = {
    asyncSignup,
    userPrototype,
    getUserByEmail
}

//createNewUser("richardbfulop@gmail.com", "thisPwdGreat");