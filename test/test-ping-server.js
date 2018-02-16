const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')

const should = chai.should();

// const { SeatReview } = require('../models');
// const { closeServer, runServer, app } = require('../server');
const {
  TEST_DATABASE_URL
} = require('../config');

const app = require('../server')

chai.use(chaiHttp);

describe('GET endpoint', function() {
  it('should return server 200 msg', function() {
    let resolve
    return chai.request(app)
      .get('/')
      .then(_res => {
        res = _res
        res.should.have.status(200)
      })
  })
})

describe('Get chair.html endpoint', function() {
  it('shoud return server 200', function() {
    let resolve
    return chai.request(app)
      .get('/chair.html')
      .then(_res => {
        res = _res
        res.should.have.status(200)
      })
  })
})
