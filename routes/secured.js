const express = require('express')
const connectEnsureLogin = require('connect-ensure-login')

const router = express.Router()

router.post('/login', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
        res.send("secured")
})

module.exports = router