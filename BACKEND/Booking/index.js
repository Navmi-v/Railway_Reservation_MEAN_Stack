const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const Booking = require('./booking.js')
const cors = require('cors');
const axios =  require('axios');

//connect to mongoDB
mongoose.connect('mongodb+srv://nav:nav@cluster0.j9caw.mongodb.net/railway', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => console.log('connected to database'))
.catch((err) => console.log(err));

//middleware to handle post requests
app.use(bodyParser.json());
app.use(cors());

app.get('/booking', (req, res) => {
  res.send('Booking service!')
});

//Get booking details
app.get('/booking/:pnr', (req,res) => {
  Booking.findOne({pnr: req.params.pnr}).then(function(booking){
    res.send(booking)
  }).catch(err => { throw err})
})

//Make a booking
app.post('/booking', (req,res) => {
    var { pname, age, gender, train, noTickets } = req.body;
    var pnr = Math.floor(Math.random() * 1000001)
    const booking = Booking.create({pname, age, gender, pnr, train, noTickets}).then(function(booking){
        res.send(booking)
    }).catch(err => { throw err})
})

//Delete a booking 
app.delete('/booking/:pnr', (req,res) => {
    Booking.findOneAndDelete({pnr: req.params.pnr}).then(function(booking){
        res.send(booking);
        res.json("Booking deleted successfully");
    }).catch(err => { throw err});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

module.exports = app;