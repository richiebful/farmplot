const express = require('express')
const passport = require('passport')

var router = express.Router()

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect("/success")
})

router.get('/login', passport.authenticate('local'), (req, res) => {
    res.send("Login view not implemented yet")
})

module.exports = router