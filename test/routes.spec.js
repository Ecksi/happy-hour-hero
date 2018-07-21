const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const config = require('../knexfile')[(process.env.NODE_ENV = 'test')];
const knex = require('knex')(config);

chai.use(chaiHttp);

describe('CLIENT routes', () => {
  it('should receive a response of html when we hit the root end point', done => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
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
          });
        });
    });
  });

  // ===========================================================
  // GET TESTS =================================================
  // ===========================================================

  describe('GET /api/v1/restaurants', () => {
    it('should return an array of all restaurants', done => {
      chai.request(server)
        .get('/api/v1/restaurants')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Brothers Bar');
          response.body[0].should.have.property('address');
          response.body[0].address.should.equal('1920 Market St');
          response.body[0].should.have.property('phone');
          response.body[0].phone.should.equal('(303) 297-2767');
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
    });

    it('should return a status of 404 if the restaurant route is wrong', done => {
      chai.request(server)
        .get('/api/v1/restoraunt')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/v1/restaurants/:id', () => {
    it('should return an array of one restaurant', done => {
      chai.request(server)
        .get('/api/v1/restaurants/1')
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
          response.body[0].phone.should.equal('(303) 297-2767');
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
    });

    it('should return an empty array if the id for the restaurant was not found', done => {
      chai.request(server)
        .get('/api/v1/restaurants/20203030')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
          done();
        });
    });
  });

  describe('GET /api/v1/drink_specials', () => {
    it('should return an array of all drink specials', done => {
      chai.request(server)
        .get('/api/v1/drink_specials')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(15);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('2-for-1 drinks');
          response.body[0].should.have.property('best_deal');
          response.body[0].best_deal.should.equal(true);
          response.body[9].name.should.equal('$3 Jager Bombs');
          response.body[9].best_deal.should.equal(false);
          done();
        });
    });

    it('should return a status of 404 if the drink_specials route is wrong', done => {
      chai.request(server)
        .get('/api/v1/dranks')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/v1/drink_specials/:id', () => {
    it('should return an array of one drink special',  done => {
      chai.request(server)
        .get('/api/v1/drink_specials/18')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('$3 Vegas Bombs');
          response.body[0].should.have.property('best_deal');
          response.body[0].best_deal.should.equal(true);
          done();
        });
    });

    it('should return an empty array if the id for the drink special was not found', done => {
      chai.request(server)
        .get('/api/v1/drink_specials/20203030')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
          done();
        });
    });
  });

  describe('GET /api/v1/food_specials', () => {
    it('should return an array of all food specials', done => {
      chai.request(server)
        .get('/api/v1/food_specials')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('25¢ wings');
          done();
        });
    });

    it('should return a status of 404 if the food specials route is wrong', done => {
      chai.request(server)
        .get('/api/v1/grub')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/v1/food_specials/:id', () => {
    it('should return an array of one food special', done => {
      chai.request(server)
        .get('/api/v1/food_specials/4')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('$2 Cheeseburger');
          response.body[0].should.have.property('best_deal');
          response.body[0].best_deal.should.equal(true);
          done();
        });
    });

    it('should return an empty array if the id for the food special was not found', done => {
      chai.request(server)
        .get('/api/v1/food_specials/20203030')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
          done();
        });
    });
  });

  describe('GET /api/v1/happy_hours', () => {
    it('should return an array of all happy hours', done => {
      chai.request(server)
        .get('/api/v1/happy_hours')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[0].should.have.property('day');
          response.body[0].day.should.equal('Monday');
          response.body[0].should.have.property('start_time');
          response.body[0].start_time.should.equal('1600');
          response.body[0].should.have.property('end_time');
          response.body[0].end_time.should.equal('2000');
          response.body[0].should.have.property('drink_specials_id');
          response.body[0].drink_specials_id.should.equal(16);
          response.body[0].should.have.property('food_specials_id');
          response.body[0].food_specials_id.should.equal(4);
          response.body[0].should.have.property('restaurant_id');
          response.body[0].restaurant_id.should.equal(1);
          done();
        });
    });
    
    it('should return a status of 404 if the happy hours route is wrong', done => {
      chai.request(server)
        .get('/api/v1/happyhappy')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/v1/happy_hours/:id', () => {
    it('should return an array of one happy hour', done => {
      chai.request(server)
        .get('/api/v1/happy_hours/4')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('day');
          response.body[0].day.should.equal('Monday');
          response.body[0].should.have.property('start_time');
          response.body[0].start_time.should.equal('1600');
          response.body[0].should.have.property('end_time');
          response.body[0].end_time.should.equal('2000');
          response.body[0].should.have.property('drink_specials_id');
          response.body[0].drink_specials_id.should.equal(16);
          response.body[0].should.have.property('food_specials_id');
          response.body[0].food_specials_id.should.equal(4);
          response.body[0].should.have.property('restaurant_id');
          response.body[0].restaurant_id.should.equal(1);
          done();
        });
    });

    it('should return an empty array if the id for the happy hour was not found', done => {
      chai.request(server)
        .get('/api/v1/happy_hours/20203030')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
          done();
        });
    });
  });
});