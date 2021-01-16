const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const PassengerSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    country: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: [true, 'Mobile number is required'],
    },
    email: {
        type: String,
        required: [true, 'E-mail ID is required'],
        lowercase: true,
        unique: true,
        validate: [ isEmail , 'Please enter a valid e-mail']
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    confirmPassword:{
        type: String,
        required: [true, 'Password is required']
    }
});


const Passenger = mongoose.model('passenger', PassengerSchema);
//exporting Passenger module
module.exports = Passenger;
