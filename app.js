require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const app = express();
const unirest = require("unirest");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
  var json = 'http://ip-api.com/json/?fields=status,city';
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var response = JSON.parse(this.responseText);
		if(response.status !== 'success') {
			console.log('query failed: ' + response.message);
			return
		}
    console.log(response.city);
    res.send(response.city);
  }}

    xhr.open('GET', json, true);
    xhr.send();
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
