const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const unirest = require("unirest");

nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/css", express.static(__dirname + "/css"));
app.use('/public', express.static(__dirname + "/public"));
app.get('/geo', (req, res) => {
  const apiCall = unirest(
   "GET",
   "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
 );
 apiCall.headers({
   "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
   "x-rapidapi-key": "7b44ded841msha82bd7cd066097fp1c9fdajsna23bb161b783"
 });
 
 apiCall.end(function(result) {
   if (res.error) throw new Error(result.error);
   console.log(result.body);
   res.send(result.body);
 });
})

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
