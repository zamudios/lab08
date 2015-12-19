var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var accounts = require('./routes/account_routes');
var address = require('./routes/address_routes');
var companies = require('./routes/company_routes');
var schools = require('./routes/school_routes');
var gpa = require('./routes/gpa_routes');
var userJob = require('./routes/userJob_routes');
var resume = require('./routes/resume_routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'lab11'}));

app.use('/', routes);
// Any routes that need authentication first, should be placed below this app.use()
app.use(function(req, res, next) {
  if(req.session.account == undefined) { //check if user is authenticated yet
    res.redirect('/login'); // they aren't so ask them to login
  }
  else {
    next(); //else proceed
  }
});

app.use('/accounts', accounts);
app.use('/address', address);
app.use('/company', companies);
app.use('/users', users);
app.use('/schools', schools);
app.use('/gpa', gpa);
app.use('/userJob',userJob);
app.use('/resume', resume)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
