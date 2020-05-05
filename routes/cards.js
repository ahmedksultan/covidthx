var express = require("express");
var router = express.Router();
const Card = require("../models/Card");

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

/* POST delete a card. */
router.post("/delete", function (req, res, next) {
    const id = req.body.id;

    Card.deleteOne({ _id: id })
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            res.json({ err: err });
        });
});

module.exports = router;
