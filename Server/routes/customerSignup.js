var express = require('express');
var router = express.Router();

// MongoDB & mongoose:
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jacky:jacky310@cluster0-5jjxe.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const mongoose = require('mongoose');

// Other packages:
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

router.get('/', function (req, res) {
  res.sendFile('customerSignup.html', { 'root': "./website" });
});

router.post('/signup', (req, res) => {
  var data = req.body;
  console.log(data);
  const saltRounds = 10;
  bcrypt.hash(data.password, saltRounds).then(hash => {
    data.password = hash;
    client.connect(err => {
      const collection = client.db("PartyRoomBooking").collection("customer");
      // Check whether the username is used
      collection.findOne({ username: data.username }, (err, customer) => {
        if (customer != null)
          res.send("usernameUsed");
        else {
          // Check whether the email is registered
          collection.findOne({ email: data.email }, (err, customer) => {
            if (customer != null)
              res.send("emailRegistered");
            else {
              // add new customer to database
              collection.insertOne(data, (err) => {
                if (err) throw err;
                console.log("Customer Signup Success!!!");
                res.send("SignupSuccess");
              });
            }
          });
        }
      });
    });
  });
});

module.exports = router;
