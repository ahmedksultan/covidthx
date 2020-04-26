var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index.html", { title: "Wall of Thanks" });
});

module.exports = router;
