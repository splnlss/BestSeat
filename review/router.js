const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
const {ChairReview} = require('./models.js')


//Temp for Testing
router.get('/', (req, res) => {
  return res.status(200).send(message);
  // add index...
})

//get reviews
router.get('/reviews', (req, res) => {
  ChairReview
    .find()
    .then(reviews => {
      res.json(reviews.map(post => review.serialize()))
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'error getting reviews' })
    })
})

router.get('/reviews/:id', (req,res) = {
  ChairReview
      .findById(req.params.id)
      .then(review => res.json(review.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'error finding by ID' });
      })
})

router.post('/reviews', (req, res) => {
  const requiredFields = ['venue', 'chairReview', 'userName'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  ChairReview
  .create({
      venue: req.body.venue,
      ChairReview: req.body.ChairReview,
      userName: req.body.userName
    })
  .then(review res.status(201).json(review.serialize()))
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'error creating review' })
    })
  })

  router.delete('/reviews/:id', (req, res) => {
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

router.put('/reviews/:id', (req, res) =>{
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    })
  const updated = {};
  const updateableFields = ['venue', 'chairReview', 'userName'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  })
  chairReview
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'error updating review' }));
})

})

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
}


// get by id
// get by venue
// get all
// update/post/delete
module.exports = router
