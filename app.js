const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const auth = require("./auth.js")
const helmet = require('helmet')
const session = require("express-session")
const MySQLStore = require('express-mysql-session')(session)
const connectEnsureLogin = require('connect-ensure-login')

const app = express()

const sessionStore = new MySQLStore(auth.defaultConnection)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator()) // Add this after the bodyParser middlewares
app.use(express.static(__dirname + '/src/', {index: "app/index.html"}))
app.use(helmet())
app.use(session({secret: ";^7+cEJd0!F9%;$lLLfS/YtkLdJhQOg_",
                 store: sessionStore,
                 resave: false, 
                 saveUninitialized: false}))
app.use("/", require("./routes/index.js"))
app.use("/login", require("./routes/login"))
app.use("/signup", require("./routes/signup"))
app.get("/secured",
        connectEnsureLogin.ensureLoggedIn(),
        (req, res) => {
                res.send("secured")
        })

passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  function(email, password, done) {
    auth.getUserByEmail(email, (user, err) => {
        if (user == null){ done(null, false)}
        user.validPassword(password).then((result) => {
            if (result === true){
                done(null, user)
            }
            else{
                done(null, false)
            }
        }).catch((error) => {
            done(error, null);
        });
    });
}))

module.exports = app;