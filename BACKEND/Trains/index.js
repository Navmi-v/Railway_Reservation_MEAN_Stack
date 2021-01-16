const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// const swaggerUi = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');

//set up the express app
const app = express();

//extended
// const swaggerOptions = {
//     swaggerDefinition : {
//         info: {
//             title: 'Trains API',
//             description: 'Train API information',
//             contact: {
//                 name: 'Navmi Vishwakarma'
//             },
//             servers: ['http://localhost:4000']
//         }
//     },
//     // [*routes/*.js]
//     apis: ["api.js"]
// }

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const routes = require('./routes/api');

//connect to mongoDB
mongoose.connect('mongodb+srv://nav:nav@cluster0.j9caw.mongodb.net/railway', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => console.log('connected to database'))
.catch((err) => console.log(err));

//middleware to handle post requests
app.use(bodyParser.json());

app.use(cors());

//intialise the routes
app.use('/api', routes);

//middleware for error handling
app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send({error: err.message});
});

const port = process.env.PORT || 4000;
//listen for requests
app.listen(port, function(){
    console.log('Now listening for requests ' +port);
})

module.exports = app;