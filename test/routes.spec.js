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

  describe('API routes', () => {
    beforeEach(done => {
      knex.migrate.rollback()
        .then(() => {knex.migrate.latest()
          .then(() => {knex.seed.run()
            .then(() => done())
          })
        })
    })
  });

  describe('GET /api/v1/restaurants', () => {
    it('should return an array of all restaurants', done => {
      chai.request(server)
        .get('/api/v1/restaurants')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Brothers Bar');
          response.body[0].should.have.property('address');
          response.body[0].address.should.equal('1920 Market St');
          response.body[0].should.have.property('phone');
          response.body[0].phone.should.equal('(303)297-2767');
          response.body[0].should.have.property('website');
          response.body[0].website.should.equal('http://www.brothersbar.com/denver-co/');
          response.body[0].should.have.property('city');
          response.body[0].city.should.equal('Denver');
          response.body[0].should.have.property('state');
          response.body[0].state.should.equal('CO');
          response.body[0].should.have.property('zip_code');
          response.body[0].zip_code.should.equal(80202);
          response.body[0].should.have.property('restaurant_image');
          response.body[0].restaurant_image.should.equal('http://www.brothersbar.com/wp-content/uploads/2015/10/GALLERY-Stapleton.jpg');
          response.body[0].should.have.property('latitude');
          response.body[0].latitude.should.equal('39.752816');
          response.body[0].should.have.property('longitude');
          response.body[0].longitude.should.equal('-104.993984')
          done();
        });
    })

    it('should return a status of 404 if the restaurant route is wrong', done => {
      chai.request(server)
        .get('/api/v1/restoraunt')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    })
  })
});