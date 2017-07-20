const express = require('express')
const passport = require('passport')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn

var router = express.Router()

router.get('/', ensureLoggedIn("/login"), (req, res) => {
        res.send("render calendar")
})

module.exports = router