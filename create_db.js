var AWS = require("aws-sdk");

AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Countries",
    KeySchema: [       
        { AttributeName: "region", KeyType: "HASH"}, //Partition key
        { AttributeName: "nom", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [       
        { AttributeName: "nom", AttributeType: "S" },
        { AttributeName: "region", AttributeType: "S"},
        { AttributeName: "area", AttributeType: "N"}
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    },
    LocalSecondaryIndexes:[
        {
            IndexName: "CountriesArea",
            KeySchema: [       
                { AttributeName: "region", KeyType: "HASH"},//Partition key
                { AttributeName: "area", KeyType: "RANGE"} 
            ],
            Projection: {
                ProjectionType: "KEYS_ONLY"
            }
        }
    ]
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
