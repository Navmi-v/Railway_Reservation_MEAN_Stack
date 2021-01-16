const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

//create admin Schema and model

const AdminSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    gender: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    country: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'E-mail ID is required'],
        unique: true,
        validate: [ isEmail, 'Please enter a valid e-mail']
    },
    contactNumber: {
        type: Number,
        required: [true, 'Mobile number is required'],
        unique: true
    },
    address: {
        houseNumber: String,
        street: String,
        city: String,
        state: String,
        pincode: Number
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    }
});



const Admin = mongoose.model('admin', AdminSchema);

//exporting Admin module
module.exports = Admin;

