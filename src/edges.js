const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-east-2",
  endpoint: "https://dynamodb.us-east-2.amazonaws.com/",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

const TableName = "bom-demonstration";
const status = 500;


module.exports = {

  async findById(req, res) {
    try {
      const params = { TableName, Key: { id:req.params.id } };
      await docClient.get(params, (err, data) => {
        if(err) throw Error(400);
        return res.json(data.Item);
      });
      return;
    } catch (err) {
      return res.status(status).send();
    }
  },
  
  async create(req, res) {
    try {
      const params = { TableName, Item: req.body };
      await docClient.put(params, (err, data) => {
        if(err) throw Error(400);
        return res.json(data);
      });
      return;
    } catch (err) {
      return res.status(status).send();
    }
  },
  
  async update(req, res) {
    try {
      const params = {
        TableName,
        Key: { id: req.params.id },
        UpdateExpression: "set edges = :e",
        ExpressionAttributeValues: { ":e": req.body.edges },
        ReturnValues: "UPDATED_NEW",
      };
      await docClient.update(params, (err, data) => {
        if(err) throw Error(400);
        return res.json(data.Attributes);
      });
      return;
    } catch (err) {
      return res.status(status).send();
    }
  },

};
