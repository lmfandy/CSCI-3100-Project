const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jacky:jacky310@cluster0-5jjxe.gcp.mongodb.net/PartyRoomBooking?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const app = express();
const router = express.Router();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const PartyRoom = require('./models/partyRoom.model');

// For Login
app.use(session({
  secret: 'csci3100',
  store: new MongoStore({ url: 'mongodb+srv://jacky:jacky310@cluster0-5jjxe.gcp.mongodb.net/sessiondb?retryWrites=true&w=majority' }),
  cookie: { maxAge: 60 * 10000 },
  saveUninitialized: false,
  resave: false
}));


// Check MongoDB Connection
mongoose.connect("mongodb+srv://jacky:jacky310@cluster0-5jjxe.gcp.mongodb.net/PartyRoomBooking", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established');
});

// For Index page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/website/index.html'));
});
app.use(express.static('website'));

app.post('/checkLogin', (req, res) => {
  var user = '';
  var isLogined = false;
  var userType = 'guest';
  if (!(req.session.user == undefined)) {
    user = req.session.user;
    isLogined = true;
    userType = req.session.userType
  }
  res.send({ user: user, isLogined: isLogined, userType: userType });
});

app.post('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.send("Logout Fail");
    }
    res.redirect('/');
  });
});

var Grid = require('gridfs-stream');
var fs = require('fs');

const conn = mongoose.createConnection(uri);
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('photos');
});

app.get('/search', (req, res) => {
  PartyRoom.find({}, async (err, r)=>{
    console.log(r);

    // var data = req.query;
    // console.log(data);
    console.log("Search Success!!!");
    //test results
    // var count = Math.floor(Math.random() * 13);
    var result = [];
    for (let i = 0; i < r.length; i++){
      let image = "";
      gfs.files.findOne({_id: r[i].photos[0]}, (err, file) => {
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No files exist'
          });
        }
        const readstream = gfs.createReadStream(file.filename);
        // readstream.pipe(res);
        readstream.on('data', (chunk) => {
          image = chunk.toString('base64');
          result.push({
            img: image,
            title: r[i].party_room_name,
            description: r[i].description,
            capacity: "min: "+r[i].quotaMin+" max: "+r[i].quotaMax,
            location: r[i].district,
            price: "See More"
          });
        });
      });
    }
    setTimeout(() => {
      res.send({
        hasResult: r.length, result: result
      });
    }, 200);
  });
});

app.post('/addPartyTest', function(req,res){
    PartyRoom.find({}, 'party_room_id').sort({party_room_id: -1}).limit(1).exec(function(err, maxIdRoom) {
      if (err) res.send(err);
      if (maxIdRoom.length == 1) {
        maxId = maxIdRoom[0].party_room_id;
      }
      else {
        maxId = 0;
      }
      client.connect(err => {
        const collection = client.db("PartyRoomBooking").collection("photos.files");
        collection.findOne({ filename: "1587399998006-bezkoder-test2.jpg"}, (err, p) => {
          var r = new PartyRoom({
            party_room_id: maxId+1,
            party_room_name: "CUHK2",
            party_room_number: "12345678",
            address: "CUHK",
            district: "Kwun Tong",
            description: "CUHK",
            quotaMin: 2,
            quotaMax: 20,
            price_setting: [{
              day: "Monday to Thursday",
              startTime: "08:00:00",
              endTime: "12:00:00",
              price: 100
            },{
              day: "Friday",
              startTime: "08:00:00",
              endTime: "12:00:00",
              price: 100
            }],
            facilities: ["VR","Switch"],
            photos: [p._id]
          });

          r.save(function(err) {
            if (err) res.send(err);
            else{
              res.send("done");
            }
          });
        });
      });
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

const customer_info = require('./routes/customer_info');
app.use('/customer', customer_info);

const owner_info = require('./routes/owner_info');
app.use('/owner', owner_info);

const createPartyRoom = require('./routes/create_partyroom');
app.use('/create_partyroom', createPartyRoom);

// const owner_route = require('./routes/owner');
//
// app.use('/owners', owner_route);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
