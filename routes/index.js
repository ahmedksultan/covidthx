var express = require("express");
var router = express.Router();
const Card = require("../models/Card");

/* GET home page. */
router.get("/", async function (req, res, next) {
    var perPage = 50;
    var queryPage = req.query["page"];
    if (queryPage == undefined) {
        queryPage = 0;
    }
    var page = Math.max(0, queryPage);

    Card.find()
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            timestamp: "desc",
        })
        .exec(function (err, cards) {
            Card.countDocuments().exec(function (err, count) {
                res.render("index.html", {
                    count: count,
                    posts: cards,
                    page: page,
                    pages: Math.ceil(count / perPage),
                });
            });
        });
});

module.exports = router;
