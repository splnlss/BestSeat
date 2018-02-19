let MOCK_NEW_REVIEWS = {
  'newReviews': [{
    "id": "1111111",
    "venue": "McDonalds",
    "chairReview": "Hard, plastic. The worst for a bad tailbone",
    "userName": "John Doe",
    "publishedAt": 1470016976609
  }, {
    "id": "2222222",
    "venue": "Cookshop",
    "chairReview": "Wooden chair - decently comfortable for about 30 min",
    "userName": "Jane Doe",
    "publishedAt": 1470012976609
  }, {
    "id": "333333",
    "venue": "Glasserie",
    "chairReview": "Folding yard chairs - How did these ever get popular in restaurants? Zero lumbar support, tailbone protrudes. You just want to smash them. ",
    "userName": "Jim Doe",
    "publishedAt": 1470011976609
  }, {
    "id": "4444444",
    "venue": "Buttermilk Channel",
    "chairReview": "Folding yard chairs AGAIN",
    "userName": "Jackie Doe",
    "publishedAt": 1470009976609
  }]
}

function renderReview(review) {
  return `<li><h3>${review.venue}</h3><p>${review.chairReview}</p>
  </li>`
}

function renderReviews(reviews) {
  return `<ul>${reviews.map(renderReview).join("\n")}
  </ul>`
}

function getNewReviews(callbackFn) {
  setTimeout(function() {
    callbackFn(MOCK_NEW_REVIEWS)
  }, 100);
}

function displayNewReviews(data) {
  $('main').html(
    renderReviews(data.newReviews)
  )
}

function getAndDisplayNewReviews() {
  getNewReviews(displayNewReviews);
}

$(function() {
  getAndDisplayNewReviews();
})

//add review section
//add form event handler
