require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const ipfilter = require('express-ipfilter').IpFilter

const app = express();

var cors = require("cors");
app.use(cors());

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

//Blacklist the following IPs

const ips = [] // put the IP in '' ; ex: '127.0.0.1'


// Throw error to blacklisted IPs
if (app.get('env') === 'development') {
  app.use((err, req, res, _next)=> {
    console.log('Error handler', err)
    if (err instanceof IpDeniedError){
      res.status(401)
    } else {
      res.status(err.status || 500 )
    }

    res.render('error', {
    message: 'You are not allowed.',
    error: err
  })
})
}

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use("/", require("./routes/index"));
app.use("/about", require("./routes/about"));
app.use("/cards", require("./routes/cards"));
app.use("/admins", require("./routes/admins"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

app.get;

app.use(ipfilter(ips))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));

