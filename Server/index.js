const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:csci3100@jacky310-chco5.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static('website'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/info' , (req,res) => {
  client.connect(err => {
    const collection = client.db("sample_airbnb").collection("listingsAndReviews");
    collection.findOne({}, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
  //client.close();
});

app.post('/search' , (req, res) => {
  let data = req.body;
  console.log(data);
  client.connect(err => {
    const collection = client.db("sample_airbnb").collection("listingsAndReviews");
    collection.findOne({name: (req.body.name)}, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
});

app.listen(3000, () => {
  console.log("done");
});
