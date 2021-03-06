const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const faker = require('faker')
const should = chai.should()

const {ChairReview} = require('../review');
const { User } = require('../user');
const { closeServer, runServer, app } = require('../server');
const {
  TEST_DATABASE_URL
} = require('../config');

let authToken
const username = 'testUser'
const password = '0000000000'

const testData = [{
  venue: "McDonalds",
  chairReview: "Hard, plastic. The worst for a bad tailbone",
  userName: "John Doe"
}, {
  venue: "Cookshop",
  chairReview: "Wooden chair - decently comfortable for about 30 min",
  userName: "Jane Doe"
}, {
  venue: "Glasserie",
  chairReview: "Folding yard chairs - How did these ever get popular in restaurants? Zero lumbar support, tailbone protrudes. You just want to smash them. ",
  userName: "Jim Doe"
}, {
  venue: "Buttermilk Channel",
  chairReview: "Folding yard chairs AGAIN",
  userName: "Jackie Doe"
}]

chai.use(chaiHttp);

describe('/api/review', function(){

  before(function(){
    return runServer(TEST_DATABASE_URL)
    .then(() =>{
      return ChairReview.create(testData)
    })
    .then(()=>{
      return chai
      .request(app)
      .post('/api/user')
      .send({
        username,
        password
      })
    })
  })
  after(function(){
    mongoose.connection.dropDatabase()
    return closeServer()
  })

  beforeEach(function(){
    return chai
      .request(app)
      .post('/api/auth/login')
      .send({username, password})
      .then(function(res){
        authToken = res.body.authToken
      })
  })

  describe('GET endpoint', function() {
    it('should return all reviews', function() {
      let resolve
      return chai.request(app)
        .get('/api/review')
        .then(_res => {
          res = _res
          res.should.have.status(200)
        })
    })
    it('should return review by ID', function(){
//fill in later..
    })
  })

  describe('Post', function(){
    it('should create new review', function(){
      const newReview = {
        venue: faker.company.companyName(),
        chairReview: faker.lorem.text()
      }
      return chai.request(app)
      .post('/api/review')
      .set('Authorization',`Bearer ${authToken}`)
      .send(newReview)
      .then(function(res){
        res.should.have.status(201)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.include.keys(
          'id','venue','chairReview','userName')
        res.body.id.should.not.be.null
        res.body.venue.should.equal(newReview.venue)
        res.body.chairReview.should.equal(newReview.chairReview)
        return ChairReview.findById(res.body.id)
      })
      .then(function(post){
        post.venue.should.equal(newReview.venue)
        post.chairReview.should.equal(newReview.chairReview)
      })
    })
  }
)

  describe('Put', function(){
    it('should update chairReview', function(){
      const updateData = {
        venue: 'Double R Diner',
        chairReview: 'David Lynch would eat here but not sit here'
      }
      this.timeout(2000)
      return ChairReview
        .findOne()
        .then(review =>{
          updateData.id = review.id
          return chai.request(app)
            .put(`/api/review/${review.id}`)
            .set('Authorization',`Bearer ${authToken}`)
            .send(updateData)
        })
        .then(res => {
          res.should.have.status(204);
        })
        .then(()=>{
          return ChairReview.findById(updateData.id)
        })
        .then(post => {
          post.venue.should.equal(updateData.venue)
          post.chairReview.should.equal(updateData.chairReview)
        })
    })
  })

  describe('Delete', function(){
    it('should delete review by id', function(){
      let review
      return ChairReview
        .findOne()
        .then(_review =>{
          review = _review
          //mising part...
          return chai.request(app).delete(`/api/review/${review.id}`).set('Authorization',`Bearer ${authToken}`)
        })
        then(res => {
          res.should.have.status(204);
          return ChairReview.findById(review.id);
        })
        .then(_review =>{
          should.not.exist(_review)
        })

    })

  })
})
