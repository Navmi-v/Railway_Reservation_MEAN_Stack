const jwt = require('jsonwebtoken');
const Passenger = require('../models/passengers')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'something here for then', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current passenger
const checkPassenger = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'something here for then', async (err, decodedToken) => {
        if (err) {
          res.locals.passenger = null;
          next();
        } else {
          let passenger = await Passenger.findById(decodedToken.id);
          res.locals.passenger = passenger;
          next();
        }
      });
    } else {
      res.locals.passenger = null;
      next();
    }
  };

module.exports = { requireAuth, checkPassenger };