var AWS = require("aws-sdk");

AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Countries",
    KeySchema: [       
        { AttributeName: "region", KeyType: "HASH"},
        { AttributeName: "nom", KeyType: "RANGE"} //Partition key
    ],
    AttributeDefinitions: [       
        { AttributeName: "nom", AttributeType: "S" },
        { AttributeName: "region", AttributeType: "S"}
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
