/**
 * Created by samuelzamudio on 12/7/15.
 */
var express = require('express');
var router = express.Router();
var gpaDal   = require('../dal/gpa');

router.get('/all', function (req, res) {
    gpaDal.GetAll(function(err, result) {
            if (err) throw err;
            res.render('displayAllCompGpa.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    gpaDal.GetByID(req.query.company_id, function (err, result) {
            if (err) throw err;

            res.render('displayCompGpaInfo.ejs', {rs: result, company_id: req.query.company_id});
        }
    );
});

module.exports = router;