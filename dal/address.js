var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM address;',
        function(err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetByID = function(companyId, callback) {
    console.log(address_id);
    var query = 'SELECT * FROM address WHERE companyId=' + company_id;
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

exports.Update = function(address_info, callback) {
    console.log(address_info);
    var values = [address_info.street, address_info.city,address_info.state,address_info.zipcode,address_info.companyId];
    connection.query('UPDATE address SET street = ?, city = ?, state = ?, zipcode = ? WHERE companyId = ?', values,
        function(err, result) {
            //connection.query('UPDATE address SET street = :street, city = :city, state_abbr = :state_abbr, zip = :zip WHERE address_id = :address_id', address_info, function(err, result) {
            if(err) {
                console.log(err);
                callback(err);
                return;
            }
            exports.GetByID(address_info.company_id, function(err, result) {
                if(err) {
                    console.log(err);
                    callback(err);
                    return;
                }
                callback(false, result);
            })
        });

}