/**
 * Created by samuelzamudio on 12/7/15.
 */
var express = require('express');
var router = express.Router();
var SchoolDal = require('../dal/schools');


router.get('/all', function (req, res) {
    SchoolDal.GetAll(function(err, result) {
            if (err) throw err;
            res.render('displayAllSchools.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    SchoolDal.GetByID(req.query.school_id, function (err, result) {
            if (err) throw err;

            res.render('displaySchoolInfo.ejs', {rs: result, school_id: req.query.school_id});
        }
    );
});


module.exports = router;