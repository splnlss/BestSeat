'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'VoQF4ECI5zLaEXAJ7jGUYR7Xzzhl-ecVK3ZEzT6tw-PM_i1PW5w_ZW8OyxRpX3S7LLXVEySD9SJsNDfvrDqhyRRLh0z3U4AbsVOreEiqXTRy_tJjjoLHgsqRnne6WnYx';

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};

const client = yelp.client(apiKey);

client.search(searchRequest)
.then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
})
.catch(e => {
  console.log(e);
});
