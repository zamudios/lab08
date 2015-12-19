/**
 * Created by samuelzamudio on 12/7/15.
 */
var express = require('express');
var router = express.Router();
var userjobDal   = require('../dal/userjob');

router.get('/all', function (req, res) {
    userjobDal.GetAll(function(err, result) {
            if (err) throw err;
            res.render('displayAllUserJobGpa.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    userjobDal.GetByID(req.query.user_id, function (err, result) {
            if (err) throw err;

            res.render('displayUserJobGpaInfo.ejs', {rs: result, user_id: req.query.user_id});
        }
    );
});

module.exports = router;