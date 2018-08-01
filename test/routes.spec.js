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
          response.body.length.should.equal(44);
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

    it('should return a specific restaraunt when queried by name', done => {
      chai.request(server)
        .get('/api/v1/restaurants?name=Star+Bar')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Star Bar');
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
          response.body.length.should.equal(60);
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
        .get('/api/v1/drink_specials/3')
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
          response.body.length.should.equal(11);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('25¢ Wings');
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
        .get('/api/v1/food_specials/2')
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
          response.body.length.should.equal(301);
          response.body[10].should.have.property('day');
          response.body[10].day.should.equal('Wednesday');
          response.body[10].should.have.property('start_time');
          response.body[10].start_time.should.equal('2000');
          response.body[10].should.have.property('end_time');
          response.body[10].end_time.should.equal('0200');
          response.body[10].should.have.property('drink_specials_id');
          response.body[10].drink_specials_id.should.equal(10);
          response.body[10].should.have.property('food_specials_id');
          response.body[10].food_specials_id.should.equal(1);
          response.body[10].should.have.property('restaurant_id');
          response.body[10].restaurant_id.should.equal(1);
          done();
        });
    });

    it('should return a custom endpoint for a restaurant_id, combined_time, and day', done => {
      chai.request(server)
        .get('/api/v1/happy_hours?restaurant_id=5&combined_times=4:00PM-7:00PM&day=Tuesday')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[1].should.have.property('restaurant_id');
          response.body[1].restaurant_id.should.equal(5);
          response.body[1].should.have.property('drink_specials_id');
          response.body[1].drink_specials_id.should.equal(27);
          done();
        });
    });

    it('should return an empty array for custom endpoint for a restaurant_id, combined_time, and day w/ incorrect information', done => {
      chai.request(server)
        .get('/api/v1/happy_hours?restaurant_id=5123123&combined_times=4:44PM-7:77PM&day=Jimday')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
          done();
        });
    });

    it('should return a custom endpoint for a restaurant_id and combined_time', done => {
      chai.request(server)
        .get('/api/v1/happy_hours?restaurant_id=18&combined_times=3:00PM-8:00PM')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(7);
          response.body[4].should.have.property('restaurant_id');
          response.body[4].restaurant_id.should.equal(18);
          response.body[4].should.have.property('drink_specials_id');
          response.body[4].drink_specials_id.should.equal(60);
          done();
        });
    });

    it('should return an empty array for custom endpoint for a restaurant_id and combined_time w/ incorrect information', done => {
      chai.request(server)
        .get('/api/v1/happy_hours?restaurant_id=12131238&combined_times=3:21PM-8:76PM')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
          done();
        });
    });

    it('should return a custom endpoint for a restaurant_id and day', done => {
      chai.request(server)
        .get('/api/v1/happy_hours?restaurant_id=15&day=Sunday')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          response.body[3].should.have.property('restaurant_id');
          response.body[3].restaurant_id.should.equal(15);
          response.body[3].should.have.property('drink_specials_id');
          response.body[3].drink_specials_id.should.equal(56);
          done();
        });
    });

    it('should return an empty array for custom endpoint for a restaurant_id and day w/ incorrect information', done => {
      chai.request(server)
        .get('/api/v1/happy_hours?restaurant_id=19212&day=Moonday')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
          done();
        });
    });

    it('should return a custom endpoint for a combined_times and day', done => {
      chai.request(server)
        .get('/api/v1/happy_hours?combined_times=10:00PM-12:00AM&day=Thursday')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('restaurant_id');
          response.body[0].restaurant_id.should.equal(17);
          response.body[0].should.have.property('drink_specials_id');
          response.body[0].drink_specials_id.should.equal(40);
          done();
        });
    });

    it('should return an empty array for custom endpoint for a combined_times and day w/ incorrect information', done => {
      chai.request(server)
        .get('/api/v1/happy_hours?combined_times=15:12PM-12:34AM&day=fogsday')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
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
        .get('/api/v1/happy_hours/28')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('day');
          response.body[0].day.should.equal('Monday');
          response.body[0].should.have.property('start_time');
          response.body[0].start_time.should.equal('1430');
          response.body[0].should.have.property('end_time');
          response.body[0].end_time.should.equal('1800');
          response.body[0].should.have.property('drink_specials_id');
          response.body[0].drink_specials_id.should.equal(21);
          response.body[0].should.have.property('food_specials_id');
          response.body[0].food_specials_id.should.equal(4);
          response.body[0].should.have.property('restaurant_id');
          response.body[0].restaurant_id.should.equal(2);
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