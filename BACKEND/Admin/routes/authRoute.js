const express= require('express');
const router = express.Router();
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { response } = require('express');
//const authController = require('../controllers/authControllers');


//router.post('/admin/login', authController.login_post);

router.post('/admin/login', (req,res) => {
    let adminData = req.body
  Admin.findOne({email: adminData.email}, (err, admin) => {
    if (err) {
      console.log(err)    
    } else {
      if (!admin) {
        res.status(401).send('Invalid Email')
        //alert('Invalid Email')
      } else 
      if ( admin.password !== adminData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: admin.role}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.adminId = payload.subject
    next()
  }

  router.get('/admin/train', verifyToken, (req,res) => {
    axios.get('http:localhost:4000/api/trains').then((response) => {
      res.send(response.data)
    }).catch(err => {
      if(err){
        throw err;
      }
    })
    });


module.exports = router;
