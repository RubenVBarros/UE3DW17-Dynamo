var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
})

var dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importation des pays")

var countries = JSON.parse(fs.readFileSync('countries.json', 'utf-8'));
countries.forEach(function(country){
    let params = {
        TableName: "Countries",
        Item: {
            "nom" : country.name.common,
            "region" : country.region,
            "languages": country.languages,
            "area": country.area
        }
    }

    docClient.put(params, function(err,data){
        if(err){
            console.error("Erreur lors de l'ajout du pays ", country.name.common, " : ", JSON.stringify(err,null,2));
        } else {
            console.log("Ajout réussi du pays ", country.name.common);
        }
    });
});