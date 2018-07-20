const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const config = require('../knexfile')[(process.env.NODE_ENV = 'test')];
const knex = require('knex')(config);

chai.use(chaiHttp);