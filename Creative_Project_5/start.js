const express = require('express');
const bodyParser = require("body-parser");

const multer = require('multer');
const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

//replace default with the mongodb name you choose to use
//this will connect to the database you have or it will create a new one if none exists
mongoose.connect('mongodb://localhost:27017/songs', {
  useNewUrlParser: true
});

//This is creating a mongoose schema
var candidateSchema = new mongoose.Schema({
  name: String,
  itunesUrl: String,
  path: String,
});

//This is creating a mongoose model from a schema
var Candidate = mongoose.model('Candidate', candidateSchema);

app.post('/api/photos', upload.single('photo'), async(req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }

  res.send({
    path: "/images/" + req.file.filename
  });
});

// Enter a new candidate
app.post('/api/songs', async(req, res) => {
  console.log("initiated post request");
  const candidate = new Candidate({
    name: req.body.name,
    itunesUrl: req.body.itunesUrl,
    path: req.body.path
  });
  this.addItem = candidate.data;
  try {
    await candidate.save();
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the candidates.
app.get('/api/songs', async(req, res) => {
  console.log("initiated get request");
  try {
    let candidate = await Candidate.find();
    res.send(candidate);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// //delete a candidate from the list
// app.delete('/api/candidates/:id', async(req, res) => {
//   console.log("initiated delete request");
//   //Candidate.deleteOne({ _id: req.params.id }, function(err) {
//   Candidate.findOneAndDelete({ _id: req.params.id }, function(err) {
//     if (err) res.sendStatus(500);
//     else {
//       console.log(req.params.id, "deleted successfully");
//       res.sendStatus(200);
//     }
//   });
// });

//delete a candidate from the list
    app.delete('/api/songs/:id', async(req, res) => {
      console.log("initiated delete request");
      Candidate.findOneAndDelete({ _id: req.params.id }, function(err) {
        if (err) res.sendStatus(500);
        else {
          console.log(req.params.id, "deleted successfully");
          res.sendStatus(200);
        }
      });
    });

// //edit a candidate
// app.put('/api/songs/:id', async(req, res) => {
//   console.log("initiated put(edit) request");
//   try {
//     let candidate = await Candidate.findOne({ _id: req.params.id });
//     candidate.numOrders += 1;
//     candidate.save();
//     res.status(200).send(candidate);
//   }
//   catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

//TO DELETE A MONGODB
//mongo               enter mongo
//show dbs            show dbs present - a db needs at least one item to show up here
//use cats            switch to the database you want to delete
//db.dropDatabase()   drops the database that is currently in use i.e., cats database.
//show dbs            database should no longer be present

//Change port to whatever port you want to use
app.listen(3008, () => console.log('Server listening on port 3008!'));