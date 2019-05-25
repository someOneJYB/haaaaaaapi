var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'cdb-rthom4by.bj.tencentcdb.com',
    user     : 'root',
    password : '123456789jiao',
    database : 'sys',
    port: '10066'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});