let chai = require('chai');
let chaiHttp= require('chai-http');
let app = require('../index');

//assertion style
chai.should()

chai.use(chaiHttp);
var expect = chai.expect;

describe('Passengers API', () => {

    /**
       * Test the POST route
       */
      describe("POST /passenger/register", () => {
        it("It should POST a new passenger", (done) => {
            const passenger = {
               name: "Rohita",
               gender: "female",
               age: 27,
               country: "India",
               contact: 9877665599,
               email: "rohita@google.com",
               username: "rohita",
               password: "test123",
               confirmPassword: "test123"
            };
            chai.request(app)
                .post("/passenger/register")
                .send(passenger)
                .end((err, response) => {
                     response.should.have.status(200);
                     response.body.should.be.a('object');

                done();
                });
        });

  });


    /**
       * Test the POST route
       */
      describe("POST /passenger/login", () => {
        it("It should login a passenger", (done) => {
            const passenger = {
               email: "pranali@google.com",
               password: "test123",
            };
            chai.request(app)
                .post("/passenger/login")
                .send(passenger)
                .end((err, response) => {
                     response.should.have.status(200);
                     response.body.should.be.a('object');
                done();
                });
        });

  });


})