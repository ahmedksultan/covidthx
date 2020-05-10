require("dotenv").config();
var express = require("express");
var router = express.Router();
const request = require("request");
const { ensureAuthenticated } = require("../config/auth");
const Card = require("../models/Card");
const User = require("../models/User");

/* POST create a new card. */
router.post("/create", function (req, res, next) {
    if (
        req.body["g-recaptcha-response"] === undefined ||
        req.body["g-recaptcha-response"] === "" ||
        req.body["g-recaptcha-response"] === null
    ) {
        return res.json({ responseError: "Please select captcha first" });
    }
    const secretKey = process.env.SECRET_KEY;

    const verificationURL =
        "https://www.google.com/recaptcha/api/siteverify?secret=" +
        secretKey +
        "&response=" +
        req.body["g-recaptcha-response"] +
        "&remoteip=" +
        req.connection.remoteAddress;

    request(verificationURL, function (error, response, body) {
        body = JSON.parse(body);

        if (body.success !== undefined && !body.success) {
            return res.json({ responseError: "Failed captcha verification" });
        } else {
            const { name, location, message, img } = req.body;

            const ip = req.clientIp;

            const newCard = new Card({
                name: name,
                location: location,
                message: message,
                img: img,
                ip: ip,
            });

            User.findOne({
                ip: req.clientIp,
            }).then(function (user) {
                if (!user) {
                    const newUser = new User({
                        ip: ip,
                        recent: Date.now(),
                    });
                    newUser.save().then((res1) => {
                        newCard
                            .save()
                            .then((res2) => {
                                res.redirect("/");
                            })
                            .catch((err) => {
                                res.status(400).send("Unable to create card");
                            });
                    });
                } else {
                    const recent = user.recent;
                    const now = Date.now();
                    let diff = now - recent;
                    let msec = diff;
                    let hh = Math.floor(msec / 1000 / 60 / 60);
                    msec -= hh * 1000 * 60 * 60;
                    let mm = Math.floor(msec / 1000 / 60);
                    msec -= mm * 1000 * 60;
                    let ss = Math.floor(msec / 1000);
                    msec -= ss * 1000;
                    if (hh < 1) {
                        user.recent = Date.now();
                        user.requests = user.requests + 1;
                        user.save().then((response) => {
                            res.send({
                                responseError: "You cannot post that often",
                            });
                        });
                    } else {
                        user.recent = Date.now();
                        user.requests = user.requests + 1;
                        user.save().then((res1) => {
                            newCard
                                .save()
                                .then((res2) => {
                                    res.redirect("/");
                                })
                                .catch((err) => {
                                    res.status(400).send(
                                        "Unable to create card"
                                    );
                                });
                        });
                    }
                }
            });
        }
    });
});

/* POST delete a card. */
router.post("/delete", ensureAuthenticated, function (req, res, next) {
    const id = req.body.id;

    Card.deleteOne({ _id: id })
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            res.json({ err: err });
        });
});

/* POST report a card. */
router.post("/report", function (req, res, next) {
    const id = req.body.id;

    Card.findOne({ _id: id }, function (err, doc) {
        doc.reported = true;
        doc.save();
    })
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            res.json({ err: err });
        });
});

/* POST report a card. */
router.post("/approve", ensureAuthenticated, function (req, res, next) {
    const id = req.body.id;

    Card.findOne({ _id: id }, function (err, doc) {
        doc.reported = false;
        doc.save();
    })
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            res.json({ err: err });
        });
});

/* POST heart a card. */
router.post("/heart", function (req, res, next) {
    const id = req.body.id;

    Card.findOne({ _id: id }, function (err, doc) {
        doc.hearts = doc.hearts + 1;
        doc.save();
    })
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            res.json({ err: err });
        });
});

module.exports = router;
