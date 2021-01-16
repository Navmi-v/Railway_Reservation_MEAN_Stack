const express = require('express');
const queryString = require('query-string');
const { response } = require('express');
const Train = require('../models/trains');


//route handlers
const router = express.Router();

//get a list of trains from the database
router.get('/trains/all', function(req,res,next){
    Train.find({}).then(function(train){
        res.send(train);
    }).catch(err => {
        if(err){ throw err; }
    })
});

//get a train detail from the database based on source and destination
router.get("/trains/:from/:to", (req, res) => {
    var { from, to } = req.params
    Train.find({ from: from, to: to }).then( function(result, err) {
        if (result.length!=0) {
            res.json(result)
        } else {
            res.send("No data found" )

        }

    }).catch(err => console.log(err))
})


//post a train in the database
router.post('/trains', function(req,res,next){
    //creates a new train document and saves it in the database
    Train.create(req.body).then(function(train){
        res.send(train)
    }).catch(next);
});

//update a train in the database
router.put('/trains/:trainNum', function(req,res,next){
    Train.findOneAndUpdate({trainNum: req.params.trainNum}, req.body).then(function(train){
        //find updated train
        Train.findOne({trainNum: req.params.trainNum}).then(function(train){
            res.send(train);
        }).catch(next);
    });
});

//delete a train from the database
router.delete('/trains/:trainNum', function(req,res,next){
        Train.findOneAndDelete({trainNum: req.params.trainNum}).then(function(train){
         res.send(train);
    }).catch(next);
});


module.exports = router;