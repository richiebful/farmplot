const mysql = require("mysql");
const crypto = require("crypto");
const pool = require("./config.js").pool
const db = require("./db.js")
require("date-utils");

const SALT_ITERATIONS = 10000;
const HASH_BYTE_LENGTH = 64;

/**
 * Creates a new user with the specified email/password combo
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {Function} done 
 */

function signup(email, password, done) {
        db.Users.selectByEmail(email, (err, user) => {
                if (err) {
                        return done(err)
                }
                else if (user) {
                        //@todo html escape email
                        return done(null, false, "User already exists with " + email)
                }

                const salt = crypto.randomBytes(16)
                crypto.pbkdf2(password, salt, SALT_ITERATIONS, HASH_BYTE_LENGTH, 'sha512', (err, hash) => {
                        if (err)
                                return done(err);
                        let user = Object.assign(Object.create(userPrototype), {
                                email,
                                password: hash,
                                salt,
                                confirmation_token: crypto.randomBytes(32),
                                token_expiration: new Date().addHours(24)
                        })

                        console.log(user)

                        db.Users.insert(user, function (err) {
                                if (err)
                                        return done(err)

                                return done(null, true)
                        })
                })
        })
}


/**
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {Function} done 
 */
function login(email, password, done) {
        db.Users.selectByEmail(email, (err, user) => {
                if (err)
                        return done(err)
                else if (!user)
                        return done(null, false, messages.email_password_invalid)
                else if (user.email_confirmed === false)
                        return done(null, false, messages.email_not_confirmed)

                user = Object.assign(Object.create(userPrototype), user)
                crypto.pbkdf2(password, new Buffer(user.salt, 'utf8'), SALT_ITERATIONS, HASH_BYTE_LENGTH, 'sha512', (err, hash) => {
                        if (err)
                                return done(err)
                        else if (crypto.timingSafeEqual(hash, user.password))
                                return done(null, user)
                        else
                                return done(null, false, messages.email_password_invalid)
                });
        })
}

/**
 * Confirm user's email
 * 
 * @param {Buffer} token 
 * @param {Number} uid 
 * @param {Function} done 
 */
function confirm(token, uid, done) {
        db.Users.selectByToken(token, (err, user) => {
                if (err)
                        return done(err)
                else if (!user)
                        return done(null, false, messages.token_not_exist)
                else if (user.email_confirmed === true)
                        return done(null, false, messages.email_confirmed)
                else if (user.token_expiration < new Date())
                        return done(null, false, messages.token_expired)

                db.Users.confirmEmail(token, uid, function (err) {
                        if (err)
                                return done(err)

                        return done(null, true)
                })
        })
}
/**
 * Begins the user session for the given user
 * 
 * @param {userPrototype} user 
 * @param {Function} done 
 */
function serializeUser(user, done) {
        return done(null, user.id)
}

/**
 * Ends the user session with the given id
 * 
 * @param {string} id 
 * @param {Function} done 
 */
function deserializeUser(id, done) {
        db.Users.selectById(id, (err, user) => {
                return done(err, user)
        })                        
}

var sessionPrototype = {
        session_id: null, //int
        expires: null, //int(11) unsigned
        data: null //text
}

var userPrototype = {
        id: null,
        username: "",
        password: null,
        salt: null,
        confirmation_token: null,
        token_expiration: null,
        email: "",
        email_confirmed: false
};

var messages = {
        email_not_confirmed: "You haven't confirmed your email yet! If you haven't gotten your confirmation message yet, enter your email in again below to resend.",
        email_password_invalid: "Email or password invalid",
        email_confirmed: "You've already confirmed your email! Try to sign in below.",
        token_expired: "Sorry, your confirmation link has expired after 24 hours. Please try sending another below.",
        token_not_exist: "Sorry, you gave us an invalid token...have you tried signing up yet?"
}

module.exports = {
        signup,
        login,
        confirm,
        serializeUser,
        deserializeUser,
        messages
}