const express = require('express');
const router = express.Router();
const Passenger = require('../models/passengers');
const jwt = require('jsonwebtoken');
const axios = require('axios');
//const Ticket = require('../models/tickets');


router.post('/passenger/register', (req, res) => {
  let passengerData = req.body;
  let passenger = new Passenger(passengerData)
  passenger.save((err, registeredPassenger) => {
    if (err) {
      console.log(err);
    } else {
      let payload = { subject: registeredPassenger._id }
      let token = jwt.sign(payload, 'secret')
      res.status(200).send({ token })
    }
  })
})

router.post('/passenger/login', (req, res) => {
  let passengerData = req.body
  Passenger.findOne({ email: passengerData.email }, (err, passenger) => {
    if (err) {
      console.log(err)
    } else {
      if (!passenger) {
        res.status(401).send('Invalid Email')
      } else
        if (passenger.password !== passengerData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = { subject: passenger.role }
          let token = jwt.sign(payload, 'secret')
          res.status(200).send({ token })
        }
    }
  })
})

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secret')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.passengerId = payload.subject
  next()
}

// router.get('/passenger/train', verifyToken, (req,res) => {
//   axios.get('http:localhost:4000/api/trains').then((response) => {
//     res.send(response.data)
//   }).catch(err => {
//     if(err){
//       throw err;
//     }
//   })
//   });

// router.post('/ticket', function (req, res) {
//   var { name, age, gender } = req.body
//   var pnr = Math.floor(Math.random() * 1000001)

//   var ticket = new Ticket({ name, age, gender, pnr })
//   Ticket.save().then(value => res.json({ message: "Ticket Booked", data: value })).catch(err => console.log(err))
// })

// router.delete('/ticket/:pnr', function (req, res, next) {
//   Ticket.findOneAndDelete({ pnr: req.params.pnr }).then(function (ticket) {
//     res.send(ticket);
//   }).catch(next);
// });


module.exports = router;
