const express = require('express')
const passport = require('passport')
const auth = require("../auth.js")

var router = express.Router()

router.get('/',(req, res) => {
        console.log(req.query.id)
        auth.confirm(req.query.token, req.query.id, (err, result) => {
                //turn all of these into renders on their various pages
                if (err === auth.messages.token_not_exist)
                        return res.send("We don't have that email token on record. Try sending another confirmation your email here if you have already signed up")
                else if (err === auth.messages.email_confirmed)
                        return res.send("That email has already been confirmed. Log in here:")
                else if (err === auth.messages.token_expired)
                        return res.send("Your confirmation link has expired after 24 hours. Try sending another here:")
                else if (err)
                        return res.send("Database error, please try again")
                else if (result === true)
                        return res.render("confirmationSuccess") //with success message and link to login
                else
                        return res.send("Database error occurred") //with error message (no token found)
        })
})

module.exports = router