var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var query = 'SELECT c.companyId, c.companyName, a.street, a.city, a.state, a.zipcode ' +
                'FROM company c JOIN address a on c.companyId = a.companyId';
    console.log(query);

    connection.query(query,function(err, result){
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            // console.log(result);
            callback(false, result);
        });
}

exports.GetByID = function(company_id, callback) {
    console.log(company_id);
    var query = 'SELECT * FROM company WHERE companyId=' + company_id;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Insert = function(company_info, callback) {
    var query_data = [company_info.CompanyName, company_info.addressId];
    var query = 'INSERT INTO company (companyName, addressId) VALUES (?, ?);'

    //NOTE: The addresses already exist we only need to save the id to the company table

    console.log(query);
    connection.query(query, query_data, function (err, result) {
        if (err) {
            console.log(err)
            callback(err);
            return;
        }
        else {
            callback(err, result);
        }
    })

}

exports.Update = function(company_info, callback) {
    var query_data = [company_info.CompanyName, company_info.addressId, company_info.companyId];
    var query = 'UPDATE company SET name = ?, address_id = ? WHERE companyId = ?';
    connection.query(query, query_data, function(err, result) {
        if(err){
            console.log(err)
            callback(err);
            return;
        }
        else {
            callback(err, result);
        }
    });
}

exports.Delete = function(company_id, callback) {
    var query = 'DELETE FROM company WHERE companyId = ' + company_id;
    connection.query(query, function(err, result){
        if(err){
            console.log(err)
            callback(err);
            return;
        }
        else {
            callback(err, result);
        }

    });
}