var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
        console.log(req.isAuthenticated())
        if (!req.isAuthenticated || !req.isAuthenticated())
                res.render("index", {layout: false})
        
        //get user from is_first_use
        res.send("map view")
});

module.exports = router;