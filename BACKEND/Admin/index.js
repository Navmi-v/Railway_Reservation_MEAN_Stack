const express = require('express');
const mongoose = require('mongoose');
const authroute = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//set up the express app
const app = express();

//static middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//view engine
app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://nav:nav@cluster0.j9caw.mongodb.net/railway';
//connect to mongoose
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => console.log('Connected to database'))
.catch((err) => console.log(err));

//importing admins model
const Admin = require('./models/admin.js');

//routes
app.use(authroute);

const port = process.env.PORT || 4040;
//listen for requests
app.listen(port, function(){
    console.log('Now listening for requests for admin service '+port);
})

module.exports = app;