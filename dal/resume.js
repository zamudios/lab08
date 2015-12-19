var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM resume;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}


exports.GetWorkedForOptions = function(callback){
    connection.query("SELECT schoolName FROM schools;", function(err, result){
        callback(err, result);
    });
}

exports.InsertResumeWorkedFor = function(school_id, selectedOptions, callback) {
    var query_data = [];
    for(var i = 0 ; i < selectedOptions.length; i++) {
        query_data.push([school_id, selectedOptions[i]]);
    }

    var query = 'INSERT INTO resume_workedFor(workedForId, account_id) VALUES ?';
    console.log(query_data);
    connection.query(query, [query_data], function(err, result){
        console.log(result);
        callback(err,result);
    });
}


exports.GetWorkedWithOptions = function(callback){
    connection.query("SELECT companyName FROM company;", function(err, result){
        callback(err, result);
    });
}

exports.InsertResumeWorkedWith= function(company_id, selectedOptions, callback) {
    var query_data = [];
    for(var i = 0 ; i < selectedOptions.length; i++) {
        query_data.push([company_id, selectedOptions[i]]);
    }

    var query = 'INSERT INTO resume_workedWith(workedWithId, account_id) VALUES ?';
    console.log(query_data);
    connection.query(query, [query_data], function(err, result){
        console.log(result);
        callback(err,result);
    });
}
