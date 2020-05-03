require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const app = express();
const unirest = require("unirest");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// Configure Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Nunjucks
nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

// Passport Config
require("./config/passport")(passport);

// Configure Mongoose
const db = process.env.MONGO_URI;
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

// Express Session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));
app.use("/admins", require("./routes/admins"));

app.use("/css", express.static(__dirname + "/css"));
app.use("/public", express.static(__dirname + "/public"));
app.get("/geo", (req, res) => {
    const apiCall = unirest(
        "GET",
        "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
    );
    apiCall.headers({
        "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
        "x-rapidapi-key": "7b44ded841msha82bd7cd066097fp1c9fdajsna23bb161b783",
    });

    apiCall.end(function (result) {
        if (res.error) throw new Error(result.error);
        console.log(result.body);
        res.send(result.body);
    });
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
