const express = require('express')
const passport = require('passport')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
const cloud = require("../cloud")

var router = express.Router()

router.post('/read', (req, res) => {
        if (!req.isAuthenticated || !req.isAuthenticated()){
                return res.sendStatus(403) //returns status forbidden
        }

        const uid = req.session.passport.user
        cloud.sendFile(res, uid, "map.json", (err) => {
                if (err)
                        return res.sendStatus(404)
        })
})

router.post("/write", (req, res) => {
        if (!req.isAuthenticated || !req.isAuthenticated()){
                return res.sendStatus(403) //returns status forbidden
        }

        const uid = req.session.passport.user
        const contents = "Hello World"
        cloud.createOrOverwriteFile(uid, "map.json", contents, (err) => {
                if (err)
                        return res.sendStatus(404)
                res.sendStatus(200)
        })
})

router.get('/', ensureLoggedIn("/login"), (req, res) => {
        res.render("map", {layout: false})
})

module.exports = router