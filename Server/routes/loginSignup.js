var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jacky:jacky310@cluster0-5jjxe.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const mongoose = require('mongoose');

router.get('/', function (req, res) {
  res.sendFile('loginSignup.html', { 'root': "./website" });
});

router.post('/login', (req, res) => {
  var data = req.body;
  console.log(data);
  client.connect(err => {
    collection.findOne()
    console.log(data.userType, data.username, "Login Success!!!");
    if (data.userType == "customer")
      res.send("CustomerLoginSuccess");
    else if (data.userType == "owner")
      res.send("OwnerLoginSuccess");
  });
});

module.exports = router;
