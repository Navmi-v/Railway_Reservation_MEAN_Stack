//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
  pname: String,
  age: Number,
  gender: String,
  noTickets: Number,
  pnr: {
    type: String,
    unique: true
  },
  // uid: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   require: true
  // },
  train: {
    trainNum: {
      type: Number,
      require: true
    },

    name: {
      type: String,
      require: true
    },

    from: {
      type: String,
      require: true
    },

    to: {
      type: String,
      require: true
    },

    departure: {
      type: String,
      require: true
    },

    arrival: {
      type: String,
      require: true
    },

    fare: {
      type: Number,
      require: true
    }

  }
});

const Booking = mongoose.model('booking', BookingSchema);

//exporting  module
module.exports = Booking;