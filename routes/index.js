var express = require("express");
var mongoose = require("express");
var router = express.Router();
const Card = require("../models/Card");

/* GET home page. */
router.get("/", function (req, res, next) {
    Card.find({}, (err, cards) => {
        array = cards;
        res.render("index.html", { title: "Wall of Thanks", posts: array });
    });
});

module.exports = router;
