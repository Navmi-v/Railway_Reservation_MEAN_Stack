let chai = require('chai');
let chaiHttp= require('chai-http');
let app = require('../index');

//assertion style
chai.should()

chai.use(chaiHttp);
var expect = chai.expect;

describe('Bookings API', () => {


  
    /**
     * Test the GET route by pnr
     */
    describe("GET /booking/:pnr", () => {
      it("It should GET the booking by pnr", (done) => {
        const pnr= "408655";
          chai.request(app)
              .get("/booking/"+ pnr)
              .end((err,response) =>{
                  response.should.have.status(200);
                  //response.body.should.be.a('object');
              done();
            });
      });
    });
  
  
    /**
       * Test the POST route
       */
      describe("POST /booking", () => {
          it("It should POST a new booking", (done) => {
              const booking = {
                  pname: "Hem",
                  age: 23,
                  gender: "female",
                  pnr: "408665",
                  noTickets: 1,
                  train: {
                  trainNum: 563,
                  name: "Delhi Express",
                  from: "Mumbai",
                  to: "Delhi",
                  departure:"14:05",
                  arrival:"13:04",
                  fare: 158,
                  distance: 2000
                  }
              };
              chai.request(app)
                  .post("/booking")
                  .send(booking)
                  .end((err, response) => {
                       response.should.have.status(200);
                      // response.body.should.be.a('object');
  
                  done();
                  });
          });
  
    });
  
      /**
       * Test the DELETE route
       */
      describe("DELETE /booking/:pnr", () => {
          it("It should DELETE an existing booking", (done) => {
              const pnr = "408665";
              chai.request(app)
                  .delete("/booking/" + pnr)
                  .end((err, response) => {
                      response.should.have.status(200);
                  done();
                  });
          });
      });
  
  
  
  
   });