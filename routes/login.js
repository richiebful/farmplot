const express = require('express')
const passport = require('passport')
const loginMessages  = require("../auth.js").messages

var router = express.Router()

router.post('/', (req, res, next) => {
        passport.authenticate('local', function (err, user, msg){      
                if (err){
                        return res.send("An error occurred")
                }
                else if (!user){
                        if (msg == loginMessages.email_password_invalid)
                                return res.render("login", {layout: false, errorMessage: msg})
                        else if (msg === loginMessages.email_not_confirmed)
                                return res.render("confirmationEmailResend", {layout: false, message: msg})
                        else
                                return res.render("login", {layout: false, errorMessage: "Unknown error occurred, please try again"})
                }
                req.logIn(user, function(err){
                        if (err) 
                                return res.send("An error occurred")
                        else
                                return res.redirect("/")
                })
        })(req, res, next)
})

router.get('/', (req, res) => {
        res.render("login", {layout: false})
})

module.exports = router