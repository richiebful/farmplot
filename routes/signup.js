const express = require('express')
const nodemailer = require("nodemailer")
const config = require("../config.js").email;

var router = express.Router();

var smtpTransport;

router.post("/", (req, res) => {
        auth.asyncSignup(req, res).then((user) => {
                cloud.initUserFolder(user.user_id)
                if (!smtpTransport) {
                        smtpTransport = nodemailer.createTransport("SMTP", config.setup)
                }
                smtpTransport.send(config.confirmationMsg(user.user_id, user.confirmation_token))
                res.redirect("/signup/sent")
        }).catch((err) => {
                console.log(err)
        })
})

router.get("/", (req, res) => {
        res.send("Unimplemented signup page")
})

router.get("/sent", (req, res) => {
        res.send("Confirmation email sent to your inbox.")
})

module.exports = router