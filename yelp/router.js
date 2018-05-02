const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const request = require('request-promise');

const jsonParser = bodyParser.json()

router.use(jsonParser)

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'VoQF4ECI5zLaEXAJ7jGUYR7Xzzhl-ecVK3ZEzT6tw-PM_i1PW5w_ZW8OyxRpX3S7LLXVEySD9SJsNDfvrDqhyRRLh0z3U4AbsVOreEiqXTRy_tJjjoLHgsqRnne6WnYx';

const client = yelp.client(apiKey);

router.get('/', (req, res) =>{
  const searchRequest = req.query;
  client.search(searchRequest)
  .then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    res.send(prettyJson);
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: 'error getting yelp results' })
  })
})

module.exports = {router}
