const express = require('express')
const nodemailer = require("nodemailer")
const config = require("../config.js");
const auth = require("../auth.js")
const initUserFolder = require("../cloud.js").initUserFolder
const db = require('../db.js')

var router = express.Router();

var smtpTransport;

router.post("/", (req, res) => {
        req.checkBody("email", config.errorMessage.email_invalid).isEmail()
        req.checkBody('password2', config.errorMessage.passwords_no_match).equals(req.body.password)
        req.checkBody('password', config.errorMessage.password_too_short).isLength({ min: 12 })
        req.checkBody('password', config.errorMessage.password_too_long).isLength({ max: 255 })
        req.checkBody('password', config.errorMessage.password_no_lowercase).matches(".*[a-z].*")
        req.checkBody('password', config.errorMessage.password_no_uppercase).matches(".*[A-Z].*")
        req.checkBody('password', config.errorMessage.password_no_number).matches(".*[0-9].*")
        req.checkBody('password', config.errorMessage.password_no_symbol).matches("\W")

        let validationErrors = req.validationErrors()
        if (validationErrors){
                let renderOpts = {layout: false}
                renderOpts[validationErrors[0].param + "Error"] = validationErrors[0].msg
                return res.render('signup', renderOpts)
        }

        auth.signup(req.body.email, req.body.password, (err, user, msg) => {
                if (err){
                        console.log(err)
                        return res.send("Database error occurred, please try again")
                }
                else if (msg){
                        return res.render("signup", {layout: false, errorMessage: msg})
                }
                
                if (config.sendEmail === true)
                        if(!smtpTransport){
                                smtpTransport = nodemailer.createTransport(config.email.setup)
                        }

                db.Users.selectByEmail(req.body.email, (err, user) => {
                        if (config.sendEmail === true)
                                smtpTransport.sendMail(config.email.confirmationMsg(user.id, user.confirmation_token))
                        else
                                console.log(config.email.confirmationLink(user.confirmation_token, user.id))

                        initUserFolder(user.id, (error) => {
                                if (err)
                                        return res.send("File I/O error occurred")
                                        
                                res.render("confirmationSent", {layout: false})
                        })
                })
        })
})

router.get("/", (req, res) => {
        return res.render("signup", {layout: false})
})

router.post("/send", (req, res) => {
        const email = req.params.email;
        db.selectByEmail(email, (err, user) => {
                if (err)
                        return res.sendStatus(500)
                if (!user)
                        return res.sendStatus(404)
                else
                        return res.redirect("/signup/sent")
        }) 
})

router.get("/send", (req, res) => {
        res.render("confirmationEmailResend", {layout: false})
})

router.get("/sent", (req, res) => {
        res.render("confirmationSent", {layout: false})
})

module.exports = router