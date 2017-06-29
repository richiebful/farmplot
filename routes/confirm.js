const express = require('express')
const passport = require('passport')
const auth = require("../auth.js")

var router = express.Router()

router.get('/',(req, res) => {
        auth.confirmUserWithToken(req.params.token, (err, result) => {
                if (err)
                        res.send("No token passed")
                else if (result === true)
                        res.send("success")
                else
                        res.send("Incorrect token passed")
        })
})