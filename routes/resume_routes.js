var express = require('express');
var router = express.Router();
var resumeDal = require('../dal/resume');

router.get('/all', function (req, res) {
    resumeDal.GetAll(function(err, result) {
            if (err) throw err;
            res.render('resume/displayAllResume.ejs', {rs: result});
        }
    );
});

router.get('/create', function(req, res) {
    resumeDal.GetAll(function(err, result) {
        res.render('resume/createResume', {address : result});
    });
});


router.get('/save', function(req, res, next) {
    console.log(req.query);

    resumeDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            resumeDal.InsertResumeWorkedFor(result.insertId, req.query.selectedOptions, function(err,result) {
                res.send("Successfully saved the data.");
            })
            resumeDal.InsertResumeWorkedWith(result.insertId, req.query.selectedOptions, function(err, result){
                res.send("Successfully save the data.")
            })
        }
    });
});


module.exports = router;