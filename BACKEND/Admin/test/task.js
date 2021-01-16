let chai = require('chai');
let chaiHttp= require('chai-http');
let app = require('../index');

//assertion style
chai.should()

chai.use(chaiHttp);
var expect = chai.expect;

describe('Admin API', () => {

    /**
       * Test the POST route
       */
      describe("POST /admin/login", () => {
        it("It should login an admin", (done) => {
            const admin = {
               email: "damini.panicker@railway.com",
               password: "test123",
            };
            chai.request(app)
                .post("/admin/login")
                .send(admin)
                .end((err, response) => {
                     response.should.have.status(200);
                     response.body.should.be.a('object');
                done();
                });
        });

  });



})