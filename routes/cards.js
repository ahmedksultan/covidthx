var express = require("express");
var router = express.Router();
const Card = require("../models/Card");
const axios = require("axios").default;

/* POST create a new card. */
router.post("/create", function (req, res, next) {
    const { name, location, message } = req.body;

    const newCard = new Card({
        name: name,
        location: location,
        message: message,
    });
    newCard
        .save()
        .then((response) => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Unable to create card");
        });
});

module.exports = router;
