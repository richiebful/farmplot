const express = require('express')
const nodemailer = require("nodemailer")
const config = require("../config.js").email;
const auth = require("../auth.js")
const initUserFolder = require("../cloud.js").initUserFolder
const db = require('../db.js')

var router = express.Router();

var smtpTransport;

router.post("/", (req, res) => {
        req.checkBody("email").isEmail()
        req.checkBody('password2', "Passwords don\'t match").equals(req.body.password)
        req.checkBody('password', 'Password is too short. It must be at least 12 characters long').isLength({ min: 12 })
        req.checkBody('password', 'Password is too long. Try to keep it to 255 characters or less').isLength({ max: 255 })

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
                                smtpTransport = nodemailer.createTransport(config.setup)
                        }

                db.Users.selectByEmail(req.body.email, (err, user) => {
                        if (config.sendEmail === true)
                                smtpTransport.sendMail(config.confirmationMsg(user.id, user.confirmation_token))
                        else
                                console.log(config.confirmationLink(user.confirmation_token, user.id))

                        initUserFolder(user.id, (error) => {
                                if (err)
                                        return res.send("File I/O error occurred")
                                        
                                res.render("confirmationSent", {layout: false})
                        })
                })
        })
})

router.get("/", (req, res) => {
        res.render("signup", {layout: false})
})

router.get("/sent", (req, res) => {
        res.render("confirmationSent", {layout: false})
})

module.exports = router