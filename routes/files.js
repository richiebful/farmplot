const express = require('express')
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')
const cloud = require("../cloud.js")

var router = express.Router()

router.post('/read', (req, res) => {
        //const filename = req.body.filename;
        cloud.sendFile(res, 1, "map", (err) => {
                console.log(err)
        })
})

router.post('/', (req, res) => {
        res.send("File manager view coming soon.")
})

module.exports = router