const mysql = require("mysql")
const session = require("express-session")
const MySQLStore = require('express-mysql-session')(session)

var config = {};

config.domain = "localhost:3000"

config.email = {
        setup: {
                pool: true,
                service: "Gmail",
                secure: "true",
                auth: {
                        user: "richardbfulop@gmail.com",
                        password: "semngnxtkiyqwqgr"
                }
        },
        confirmationMsg: function confirmation(userEmail, token){
                return {
                        from: '"Richard Fulop" <richardbfulop@gmail.com>',
                        to: userEmail,
                        subject: 'Farmplot: Please confirm your email address',
                        text: "Thanks for signing up to Farmplot. Go to this link (http://localhost:8000/confirm?token="+ token + ") to confirm your email address and start working with us\nThanks,\nThe Farmplot Team",
                        html: "Thanks for signing up to Farmplot. Go <a href='http://localhost:8000/confirm?token="+ token +">here</a> to confirm your email address and start working with us\nThanks,\nThe Farmplot Team"
                }
        },
        confirmationLink: function confirmationLink(token, id){
                return "http://localhost:8000/confirm?token="+ token.toString("hex") + "&id=" + id
        }
}

config.pool = mysql.createPool({
        host: "localhost",
        database: "fplot",
        user: "farmplot",
        password: "aZ)rzHs9btRT"
})

config.mysqlStore = new MySQLStore({
        checkExpirationInterval: 900000,
	expiration: 86400000,
	createDatabaseTable: true,
        schema: {
                tableName: 'Sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
        }
}, config.pool)

config.sessionOptions = {
        secret: ";^7+cEJd0!F9%;$lLLfS/YtkLdJhQOg_",
        store: config.mysqlStore,
        resave: false,
        saveUninitialized: false,
        schema: {
                tableName: 'Sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
        }
}

config.isDebugMode = true;

config.errorMessage = {
        email_not_confirmed: "You haven't confirmed your email yet! If you haven't gotten your confirmation message yet, enter your email in again below to resend.",
        email_password_invalid: "Email or password invalid",
        email_confirmed: "You've already confirmed your email! Try to sign in below.",
        token_expired: "Sorry, your confirmation link has expired after 24 hours. Please try sending another below.",
        token_not_exist: "Sorry, you gave us an invalid token...have you tried signing up yet?",
        email_invalid: "Email invalid",
        password_too_short: "Password is too short. It must be at least 12 characters long",
        password_too_long: 'Password is too long. Try to keep it to 255 characters or less',
        passwords_no_match: "Passwords don\'t match",
        password_no_lowercase: 'Password doesn\'t contain a lowercase letter',
        password_no_uppercase: 'Password doesn\'t contain an uppercase letter',
        password_no_symbol: 'Password doesn\'t contain a symbol',
        password_no_number: 'Password doesn\'t contain a number',
}

module.exports = config