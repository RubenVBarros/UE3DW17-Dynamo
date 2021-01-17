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

router.get('/afrique', function(req, res) {
  let params = {
    TableName: "Countries",
    IndexName: "CountriesArea",

    KeyConditionExpression: "#reg = :region",
    ExpressionAttributeNames:{
      "#reg": "region"
    },
    ExpressionAttributeValues:{
      ":region": {"S":"Africa"}
    },
    ProjectionExpression:"nom, area",
    Limit: 22
  };

  req.dynamodb.query(params, function(err,data){
    if(err){
      res.render("error_json",{"err":err});
    } else {
      data.Items.splice(0,10-1);
      res.render("list",{
        "list": data.Items.map(country => country.nom.S + " : " + country.area.N + "km²"),
        "title": "Pays africains par superficie (entre le 10e et le 22e)"
      });
    }
  });
});

router.get('/infos', function(req, res) {
  let params = {
    TableName: "Countries",
    FilterExpression: "#n = :nom",
    ExpressionAttributeNames:{
      "#n": "nom"
    },
    ExpressionAttributeValues:{
      ":nom": {"S":"Ireland"}
    },
  };
  req.dynamodb.scan(params, function(err,data){
    if(err){
      res.render("error_json",{"err":err});
    } else {
      console.log(JSON.stringify(data));
      res.render("pays",{
        "pays": data.Items[0]
      });
    }
  });
});

router.get('/neerlandais', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/lettre', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/superficie', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
