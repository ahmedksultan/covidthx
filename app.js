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
app.use('/public', express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
