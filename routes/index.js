var express = require('express');
var router = express.Router();
var account = require('../dal/account');
var resume = require('../dal/resume');

/* GET home page.*/
router.get('/', function(req, res, next) {
  if(req.session.account === undefined){
    res.render('index');
  }
  else {
    var data ={firstName: req.session.account.firstName};
    res.render('index', data);
  }
});

router.get('/templatelink', function(req, res, next) {
  res.render('templateexample.ejs' );
});


router.get('/login', function(req, res) {
  res.render('authentication/login.ejs');
});

router.get('/authenticate', function(req, res) {
  account.GetByEmail(req.query.email, function (err, account) {
    if (err) {
      res.render('authentication/login.ejs', { msg: err});
    }
    else if (account == null) {
      res.render('authentication/login.ejs', { msg: "User not found."});
    }
    else if (account.password != req.query.password)
      res.render('authentication/login.ejs', {msg: "Passwords do not match."});
    else {
      req.session.account = account;
      res.send('User successfully logged in.');
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy( function(err) {
    res.render('authentication/logout.ejs');
  });
});

router.get('/signup', function(req, res){
  res.render('userFormCreate.ejs');
});

router.get('/foundbyoptions', function(req, res) {
  account.GetFoundByOptions(function (err, options) {
    res.send(options);
  });
});

router.get('/workedFor', function(req, res){
  resume.GetWorkedForOptions(function(err, options){
    res.send(options);
  });
});

router.get('/workedWith', function(req, res){
  resume.GetWorkedWithOptions(function(err, options){
    res.send(options);
  });
});

router.get('/saveUserAjax', function(req, res) {
  console.log(req.query);

  account.Insert(req.query, function(err, result) {
    if (err) {
      var responseData = {success: false, error: err.message};
      res.send(responseData);
    }
    else {
      account.InsertAccountFoundBy(result.insertId, req.query.selectedOptions, function(err,result) {
        if (err) {
          var responseData = {success: false, error: err.message};
          res.send(responseData);
        }
        var responseData = {success: true};
        res.send(responseData);
      })
    }
  });
});


router.get('/saveResumeAjax', function(req, res) {
  console.log(req.query);

  resume.Insert(req.query, function(err, result) {
    if (err) {
      var responseData = {success: false, error: err.message};
      res.send(responseData);
    }
    else {
      resume.InsertResumeWorkedWith(result.insertId, req.query.selectedOptions, function(err,result) {
        if (err) {
          var responseData = {success: false, error: err.message};
          res.send(responseData);
        }
        var responseData = {success: true};
        res.send(responseData);
      })

      resume.InsertResumeWorkedFor(result.insertId, req.query.selectedOptions, function(err,result) {
        if (err) {
          var responseData = {success: false, error: err.message};
          res.send(responseData);
        }
        var responseData = {success: true};
        res.send(responseData);
      })
    }
  });
});

module.exports = router;
