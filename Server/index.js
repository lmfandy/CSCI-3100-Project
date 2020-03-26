const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jacky:jacky310@cluster0-5jjxe.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const app = express();

app.use(express.static('website'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + './website/index.html'));
});

app.post('/customerSignUp' , (req, res) => {
  var data = req.body;
  const saltRounds = 10;
  bcrypt.hash(data.password, saltRounds).then(function (hash) {
    data.password = hash;
    client.connect(err => {
      const collection = client.db("PartyRoomBooking").collection("customer");
      collection.insert(data);
      console.log("Customer Signup Success!!!");
    });
  });
});

// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname + 'hello-react-app/public/index.html'));
// });

// app.get('/info' , (req,res) => {
//   client.connect(err => {
//     const collection = client.db("sample_airbnb").collection("listingsAndReviews");
//     collection.findOne({}, function(err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
//   });
//   //client.close();
// });
//
// app.post('/search' , (req, res) => {
//   let data = req.body;
//   console.log(data);
//   client.connect(err => {
//     const collection = client.db("sample_airbnb").collection("listingsAndReviews");
//     collection.findOne({name: (req.body.name)}, function(err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
//   });
// });

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
