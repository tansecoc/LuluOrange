var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  user            : 'cs340_zhaoso',
  password        : '3818',
  database        : 'cs340_zhaoso'
});
module.exports.pool = pool;
