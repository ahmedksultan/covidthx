const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/css", express.static(__dirname + "/css"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
