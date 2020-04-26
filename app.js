var createError = require('http-errors');
var express = require('express');
var nunjucks  = require('nunjucks');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var env = nunjucks.configure(['views/'], { // set folders with templates
    autoescape: true,
    express: app
});

app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('index.html', {title: 'Wall of Thanks'});
});

app.get('/users', function(req, res) {
    res.render('users.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  res.status(404).send("Sorry can't find that!")
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
