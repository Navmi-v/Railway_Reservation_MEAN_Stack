let chai = require('chai');
let chaiHttp= require('chai-http');
let app = require('../index');

//assertion style
chai.should()

chai.use(chaiHttp);
var expect = chai.expect;

describe('Trains API', () => {

    /**
     * Test the GET route
     */
    describe("GET /api/trains/all", () => {
      it("It should GET all the trains", (done) => {
          chai.request(app)
              .get("/api/trains/all")
              .end((err,response) =>{
                  response.should.have.status(200);
                  response.body.should.be.a('array');
                 // response.body.length.should.be.eq(13);
              done();
            });
      });
    });
  
    /**
     * Test the GET route by source and destination
     */
    describe("GET /api/trains/:from/:to", () => {
      it("It should GET all the trains between source and destination", (done) => {
        const from= "Pune";
        const to= "Jammu";
          chai.request(app)
              .get("/api/trains/"+ from +'/'+ to)
              .end((err,response) =>{
                  response.should.have.status(200);
                  response.body.should.be.a('array');
              done();
            });
      });
    });
  
  
    /**
       * Test the POST route
       */
      describe("POST /api/trains", () => {
          it("It should POST a new train", (done) => {
              const train = {
                  trainNum: 56312,
                  name: "Delhi Express",
                  from: "Mumbai",
                  to: "Delhi",
                  departure:"14:05",
                  arrival:"13:04",
                  fare: 158,
                  distance: 2000
              };
              chai.request(app)
                  .post("/api/trains")
                  .send(train)
                  .end((err, response) => {
                       response.should.have.status(200);
                      // response.body.should.be.a('object');
  
                  done();
                  });
          });
  
    });
  
    /**
      * Test the PUT route
      */
     describe("PUT /api/trains/:trainNum", () => {
         it("It should PUT an existing train", (done) => {
             const trainNum = 561;
             const train = {
               name: "Mumbai Express",
               trainNum: 561,
               from: "Mumbai",
               to: "Pune",
               distance: 400,
               departure:"06:30",
               arrival:"10:00",
               fare: 520
             };
             chai.request(app)
                 .put("/api/trains/" + trainNum)
                 .send(train)
                 .end((err, response) => {
                     response.body.should.be.a('object');
                 done();
               });
         });
     
      });
  
      /**
       * Test the DELETE route
       */
      describe("DELETE /api/trains/:trainNum", () => {
          it("It should DELETE an existing train", (done) => {
              const trainNum = 561;
              chai.request(app)
                  .delete("/api/trains/" + trainNum)
                  .end((err, response) => {
                      response.should.have.status(200);
                  done();
                  });
          });
      });
  
  
  
  
   });