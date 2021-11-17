var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_tansecoc',
  password        : '7695',
  database        : 'cs340_tansecoc'
});
module.exports.pool = pool;
