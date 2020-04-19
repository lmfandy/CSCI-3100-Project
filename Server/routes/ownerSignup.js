var express = require('express');
var router = express.Router();

const uploadController = require("./uploadPhoto");

// MongoDB & mongoose:
const mongo = require('mongodb')
const mongoose = require('mongoose');;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jacky:jacky310@cluster0-5jjxe.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const Grid = require('gridfs-stream');

// Other packages:
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

router.get('/', function (req, res) {
  res.sendFile('ownerSignup.html', { 'root': "./website" });
});

router.post('/signup', (req, res) => {
  var data = req.body;
  console.log(data);
  const saltRounds = 10;
  bcrypt.hash(data.password, saltRounds).then(function (hash) {
    data.password = hash;
    client.connect(err => {
      const collection = client.db("PartyRoomBooking").collection("owner");
      collection.insertOne(data, (err) => {
        if (err) throw err;
        console.log("Owner Signup Success!!!");
        res.send("SignupSuccess");
      });
      // return res.redirect('/');
    });
  });
});

router.post('/uploadPhoto',  uploadController.uploadFile);

router.post('/downloadPhoto', (req, res) =>{
  // const collection = client.db("PartyRoomBooking").collection("photo.chunks");
  // collection.find({}).sort( { n: 1 } );
  // var role = req.session.user.role;
  // var conn = mongoose.connection;
  var gfs = Grid(client.db("PartyRoomBooking"), mongo);
   gfs.findOne({}, function (err, file) {
    if (err) {
        return res.status(400).send(err);
    }
    else if (!file) {
        return res.status(404).send('Error on the database looking for the file.');
    }

    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

    var readstream = gfs.createReadStream({
      filename: "1587317221121-bezkoder-csci3100_tree.png"
    });

    readstream.on("error", function(err) {
        res.end();
    });
    readstream.pipe(res);
  });
});

module.exports = router;
