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
  return `<li><h3>${review.venue}</h3><button class="editReview" data-reviewid=${review.id}>Edit</button>
  <button class="deleteReview" data-reviewid=${review.id}>Delete</button>
  <p>${review.chairReview}</p>
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

function renderReviewForm(review) {
  const reviewDataID = ` data-reviewid =${review.id}`
  return `<h2> Add a review</h2>
  <form id="${review?'chairEditForm':
    'chairAddForm'}"${review?reviewDataID:""}>
    <label for="venue">Venue:</label>
    <input type="text" id="venueInput" name="venue"> </input>
    <label for="review">Chair Review:</label>
    <input type="text" id="reviewInput" name="review"> </input>
    <label for="userNameInput">UserName:</label>
    <input type="text" id="userNameInput" name="userName"> </input>
    <input type="submit"></input>
  </form>
  <button id="cancelForm"> cancel</button>`
}

function displayAddForm() {
  $('main').html(
    renderReviewForm()
  )
}

function displayEditForm(review) {
  $('main').html(
    renderReviewForm(review)
  )
  $('#venueInput').val(review.venue)
  $('#reviewInput').val(review.chairReview)
  $('#userNameInput').val(review.userName)
}

function renderSearchForm() {
  return ` <h2> Edit a review</h2>
  <p> Enter venue search</p>
  	<form id="chairSearchForm">
    <label for="venue">Venue:</label>
    <input type="text" id="venueSearch" name="venueSearch"> </input>
    <input type="submit"></input>
  </form>  `
}

function displaySearchForm() {
  $(`main`).html(
    renderSearchForm()
  )
}

function setupUIHandlers() {
  $('main').on('submit', '#chairAddForm', handleAddFormSubmit)
  $('main').on('submit', '#chairEditForm', handleEditFormSubmit)
  $('main').on('submit', '#chairSearchForm', handleSearchFormSubmit)
  $('#addForm').on('click', displayAddForm)
  $('main').on('click', '#cancelForm', getAndDisplayNewReviews)
  $('main').on('click', '.editReview', handleEditReview)
  $('main').on('click', '.deleteReview', handleDeleteReview)

}

function handleEditReview(event){
  const review = MOCK_NEW_REVIEWS.newReviews.find(function (review){
    return review.id == $(event.currentTarget).data().reviewid
  })
  displayEditForm(review)
}

function handleAddFormSubmit(event) {
  event.preventDefault()
  MOCK_NEW_REVIEWS.newReviews.push({
    "venue": $('#venueInput').val(),
    "chairReview": $('#reviewInput').val(),
    "userName": $('#userNameInput').val()
  })
  getAndDisplayNewReviews()
}

function handleEditFormSubmit(event){
  event.preventDefault()
  const review = MOCK_NEW_REVIEWS.newReviews.find(function (review){
    return review.id == $(event.currentTarget).data().reviewid
  })
  review.venue = $('#venueInput').val()
  review.chairReview = $('#reviewInput').val()
  review.userName = $('#userNameInput').val()
  getAndDisplayNewReviews()
}

function handleSearchFormSubmit(event) {
  event.preventDefault()
  const element = MOCK_NEW_REVIEWS.newReviews.filter(function(review) {
    return review.venue.toLowerCase().trim() == $('#venueSearch').val().toLowerCase()
      .trim()
  })
  getAndDisplayNewReviews()
}

function handleDeleteReview(event){
  const review = MOCK_NEW_REVIEWS.newReviews.find(function (review){
    return review.id == $(event.currentTarget).data().reviewid
  })
    const removeIndex = MOCK_NEW_REVIEWS.newReviews.indexOf(review)
    console.log(MOCK_NEW_REVIEWS.newReviews.slice(removeIndex))
    displayNewReviews(MOCK_NEW_REVIEWS.newReviews.slice(removeIndex))
}

$(function() {
  getAndDisplayNewReviews()
  setupUIHandlers()
})


//add review section
//add form event handler
