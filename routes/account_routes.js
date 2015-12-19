var express = require('express');
var router = express.Router();
var accountDal = require('../dal/account');

router.get('/all', function(req, res) {
    accountDal.GetAll(function (err, result) {
            if (err) throw err;
            //NOTE: res.send() will return plain text to the browser.
            //res.send(result);

            //res.render() will return render the template provided
            res.render('displayAllAccounts.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    accountDal.GetByID(req.query.account_id, function (err, result) {
            if (err) throw err;

            res.render('displayAccountInfo.ejs', {rs: result, account_id: req.query.account_id});
        }
    );
});

module.exports = router;