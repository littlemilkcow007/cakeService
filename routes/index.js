var express = require('express');
var router = express.Router();
// var conn = require('../public/javascripts/conn')
// conn.connect()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

module.exports = router;
 
/* connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
}); */