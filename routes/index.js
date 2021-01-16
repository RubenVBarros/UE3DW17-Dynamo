var express = require('express');
const { route } = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'Express' });
});

router.get('/europe', function(req,res){
  let params = {
    TableName: "Countries",
    ProjectionExpression: "cca2, name.official",
  };
  req.dynamodb.query(params, function(err,data){
    if(err){
      res.send(JSON.stringify(err,null,2));
    } else {
      res.render("list",{"list": data});
    }
  });
});

module.exports = router;
