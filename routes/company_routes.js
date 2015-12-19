var express = require('express');
var router = express.Router();
var companyDal = require('../dal/company');
var addressDal = require('../dal/address');

router.get('/all', function(req, res) {
    companyDal.GetAll(function (err, result) {
            if (err) throw err;
            //NOTE: res.send() will return plain text to the browser.
            //res.send(result);

            //res.render() will return render the template provided
            res.render('displayAllCompanies.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    companyDal.GetByID(req.query.company_id, function (err, result) {
            if (err) throw err;

            res.render('displayCompanyInfo.ejs', {rs: result, company_id: req.query.company_id});
        }
    );
});

router.get('/create', function(req,res) {
    addressDal.GetAll(function (err, result) {
        res.render('company/companyFormCreate', {address: result});
    });
});


router.get('/save', function(req,res){
    console.log(req.query);

    companyDal.Insert(req.query, function (err, result) {
        if (err) {
            res.send('Error adding new company.</br>' + err);
        }
        else {
            res.send("Successfully, saved the data.");
        }
    })
});


router.get('/edit', function(req, res) {
    var company_id = req.query.company_id;
    console.log("company_id: " + company_id);
    companyDal.GetByID(company_id, function(err, company_results){

        if(err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving company with id " + company_id + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('company/editCompany', data);
        }
        else {
            addressDal.GetAll(function(err, address_results) {

                console.log(company_results);
                var data = {
                    company: company_results,
                    address: address_results
                };
                res.render('company/editCompany    ', data);
            })
        }
    });

});

router.get('/update', function(req, res, next) {
    companyDal.Update(req.query, function(err, result){
        var company_id = req.query.company_id;
        console.log("company_id: " + company_id);
        companyDal.GetByID(company_id, function(err, company_results){

            if(err) {
                var alert_class = 'alert-danger';
                var data = {
                    message: "Error retrieving company with id " + company_id + "<p>" + err + "</p>",
                    alert_class: alert_class
                };
                res.render('company/company_edit', data);
            }
            else {
                addressDal.GetAll(function(err, address_results) {

                    var alert_class = 'alert-success';
                    var message = "Successfully Updated!";

                    console.log(company_results);
                    var data = {
                        message: message,
                        alert_class: alert_class,
                        company: company_results,
                        address: address_results
                    };
                    res.render('company/company_edit', data);
                })
            }
        });
    })
});


router.get('/delete', function(req, res) {
    console.log(req.query.company_id);

    companyDal.Delete(req.query.company_id, function(err, result) {
        res.send(req.query.name + ' was successfully deleted.');
    });
});

module.exports = router;