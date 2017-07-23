var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
        if (!req.isAuthenticated || !req.isAuthenticated())
                res.render("index", {layout: false})
        
        //get user from is_first_use
        res.redirect("/map")
});

router.use("/login", require("./login.js"))
router.use("/signup", require("./signup.js"))
router.use("/confirm", require("./confirm.js"))
router.use("/calendar", require("./calendar.js"))
router.use("/map", require("./map.js"))
router.use("/inventory", require("./inventory.js"))


module.exports = router;