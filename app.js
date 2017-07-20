const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const auth = require("./auth.js")
const helmet = require('helmet')
const session = require("express-session")
const config = require('./config.js')
const exphbs  = require('express-handlebars')
const path = require('path')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

app.engine('handlebars', exphbs({extname: '.hbs'}))
app.use(session(config.sessionOptions))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'assets')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator()) // Add this after the bodyParser middlewares
app.use(helmet())
app.use("/", require("./routes/index.js"))
app.use("/login", require("./routes/login.js"))
app.use("/signup", require("./routes/signup.js"))
app.use("/secured", require("./routes/secured.js"))
app.use("/files", require("./routes/files.js"))
app.use("/confirm", require("./routes/confirm.js"))

passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
}, auth.login))

passport.serializeUser(auth.serializeUser)
passport.deserializeUser(auth.deserializeUser)

module.exports = app;