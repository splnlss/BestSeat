const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
const {ChairReview} = require('./model.js')
const passport = require('passport')

const jsonParser = bodyParser.json()

router.use(jsonParser)

const jwtAuth = passport.authenticate('jwt', {session: false})

//get reviews
router.get('/', (req, res) => {
  let promise
  if (req.query["searchTerm"]){
    console.log(req.query["searchTerm"])
    promise= ChairReview.findByVenue(req.query["searchTerm"])
  }else{
    console.log('no searchTerm')
    promise = ChairReview.find()
  }
  promise
    .then(reviews => {
      res.json(reviews.map(review => review.serialize()))
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'error getting reviews' })
    })
})

router.get('/:id', (req,res) => {
  ChairReview
      .findById(req.params.id)
      .then(review => res.json(review.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'error finding by ID' });
      })
})

router.post('/', jwtAuth, (req, res) => {
  const requiredFields = ['venue', 'chairReview'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  console.log(req.user.username)
  ChairReview
  .create({
      venue: req.body.venue,
      address:req.body.address,
      chairReview: req.body.chairReview,
      imageURL: req.body.imageURL,
      phone: req.body.phone,
      price: req.body.price,
      yelpUrl: req.body.yelpUrl,
      userName: req.user.username
    })
  .then(review => res.status(201).json(review.serialize()))
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'error creating review' })
    })
  })

router.put('/:id', jwtAuth, (req, res) =>{
  if (!(req.params.id && req.body.id && (req.params.id === req.body.id))) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    })
  }
  const updated = {};
  const updateableFields = ['venue', 'chairReview', 'imageURL'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  })
  ChairReview
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'error updating review' }))
})

router.delete('/:id', jwtAuth, (req, res) => {
    ChairReview
      .findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).json({ message: 'success' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'error deleting review' });
      })
  })

module.exports = {router}
