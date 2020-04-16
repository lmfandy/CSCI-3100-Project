const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jacky:jacky310@cluster0-5jjxe.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const app = express();
const router = express.Router();

app.use(express.static('website'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// Check MongoDB Connection
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established');
});

// For Index page
app.get('/', function (req, res) {
  res.sendFile('index.html', { 'root': "./website" });
});

app.get('/search', (req, res) => {
  var data = req.query;
  console.log(data);
  client.connect(err => {
    console.log("Search Success!!!");
    res.send("SearchSuccess");
  });
});

// For Login page
const loginSignup = require('./routes/loginSignup');
app.use('/loginSignup', loginSignup);

// For Customer Signup page
const customerSignup = require('./routes/customerSignup');
app.use('/customerSignup', customerSignup);

// For Owner Signup page
const ownerSignup = require('./routes/ownerSignup');
app.use('/ownerSignup', ownerSignup);


// const owner_route = require('./routes/owner');
//
// app.use('/owners', owner_route);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
