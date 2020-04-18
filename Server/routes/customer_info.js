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
  res.sendFile('customer_info.html', { 'root': "./website" });
});

module.exports = router;
