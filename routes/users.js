var express = require('express');
var accountDal = require('../dal/account');
var companyDal = require('../dal/company');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create/', function(req, res, next){
  res.render('userFormCreate',{ subtitle: 'Lab08' });
});

router.get('/save', function(req, res, next) {
  console.log(req.query)

  console.log("firstname equals: " + req.query.firstname);
  console.log("the lastname submitted was: " + req.query.lastname);
  console.log("email entered was: " + req.query.email);
  console.log("user's password is: " + req.query.password);

  accountDal.Insert(req.query, function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      accountDal.InsertAccountFoundBy(result.insertId, req.query.selectedOptions,
      function(err, result) {
        res.send("Successfully, saved the data.");
      })
    }
  });
});

module.exports = router;
