var express = require('express');
const { route } = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/europe', function(req,res){
  let params = {
    TableName: "Countries",
    KeyConditionExpression: "#reg = :region",
    ExpressionAttributeNames:{
      "#reg": "region"
    },
    ExpressionAttributeValues:{
      ":region": {"S":"Europe"}
    },
    ProjectionExpression:"nom",
  };
  req.dynamodb.query(params, function(err,data){
    if(err){
      res.render("error_json",{"err":err});
    } else {
      res.render("list",{
        "list": data.Items.map(country => country.nom.S),
        "title": "Pays européens"
      });
    }
  });
});

module.exports = router;
