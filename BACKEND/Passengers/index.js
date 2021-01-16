const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
//set up the express app
const app = express();

//static middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

//set the view engine
app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://nav:nav@cluster0.j9caw.mongodb.net/railway';
//connect to mongoose database
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => console.log('connected to database'))
.catch((err) => console.log(err));


//importing admins model
const Passenger = require('./models/passengers.js');


//middleware for error handling
app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send({error: err.message});
});

app.use(authRoute);

const port = process.env.PORT || 8080;
//listen for requests
app.listen(port, function(){
    console.log('Now listening for requests for passenger service ' + port);
})

module.exports = app;
