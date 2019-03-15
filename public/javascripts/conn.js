var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'cake'
});
//3 打开数据库链接
connection.connect();

//暴露模块
module.exports=connection;