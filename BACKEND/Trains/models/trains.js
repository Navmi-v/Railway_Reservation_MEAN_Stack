const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create train Schema and model

const TrainSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Train name is required'],
    },
    trainNum:{
        type: Number,
        required: [true, 'Train number is required'],
        unique: [true, 'Train number must be unique']
    },
    from: {
        type: String,
        required: [true, 'Where from?']
    },
    to: {
        type: String,
        required: [true, 'Where to?']
    },
    distance: {
        type: Number,
        required: true
    },
    fare: {
        type: Number,
        required: true

    },
    arrival: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
});
const Train = mongoose.model('train', TrainSchema);

//exporting train module
module.exports = Train;