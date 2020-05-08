var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");
const Admin = require("../models/Admin");
const Card = require("../models/Card");

/* GET admin dashboard. */
router.get("/dashboard", ensureAuthenticated, (req, res, next) => {
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
                res.render("admin_dashboard.html", {
                    posts: cards,
                    page: page,
                    pages: Math.ceil(count / perPage),
                });
            });
        });
});

/* GET admin reported. */
router.get("/reported", ensureAuthenticated, (req, res, next) => {
    var perPage = 50;
    var queryPage = req.query["page"];
    if (queryPage == undefined) {
        queryPage = 0;
    }
    var page = Math.max(0, queryPage);

    Card.find({ reported: true })
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            timestamp: "desc",
        })
        .exec(function (err, cards) {
            Card.countDocuments({ reported: true }).exec(function (err, count) {
                res.render("admin_reported.html", {
                    posts: cards,
                    page: page,
                    pages: Math.ceil(count / perPage),
                });
            });
        });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
    res.render("admin_login.html");
});

/* POST login handle. */
router.post("/login", function (req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/admins/dashboard",
        failureRedirect: "/admins/login",
        failureFlash: true,
    })(req, res, next);
});

/* GET logout handle. */
router.get("/logout", function (req, res, next) {
    req.logout();
    res.redirect("/");
});

module.exports = router;
