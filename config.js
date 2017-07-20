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

module.exports = config