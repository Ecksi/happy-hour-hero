const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const config = require('../knexfile')[(process.env.NODE_ENV = 'test')];
const knex = require('knex')(config);

chai.use(chaiHttp);

describe('CLIENT routes', () => {
  it('should receive a response of html when we hit the root end point', done => {
    chai
      .request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });

  it('should return a 404 for a route that does not exist', done => {
    chai
      .request(server)
      .get('/capstone')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});