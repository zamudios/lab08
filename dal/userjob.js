/**
 * Created by samuelzamudio on 12/7/15.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    connection.query('SELECT * FROM UserJobView;',
        function(err, result){
            if(err){
                console.log(err);
                callback( true );
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.GetByID = function(user_id, callback) {
    console.log(user_id);
    var query = 'SELECT * FROM UserJobView WHERE userId=' + user_id;
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
