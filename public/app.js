let jwt

//PAGE AJAX CALLS
function getAllReviews (success, failure){
  const settings = {
    url: '/api/review',
    type: 'GET',
    dataType: 'json',
    success,failure
  }
  $.ajax(settings)
}

function getReview (id, success, failure){
  const settings = {
    url: `/api/review/${id}`,
    type: 'GET',
    dataType: 'json',
    success,failure
  }
  $.ajax(settings)
}

function postReview (review, success, failure){
  console.log(review)
  const settings = {
    url: '/api/review',
    type: 'POST',
    data: JSON.stringify(review),
    dataType: 'json',
    contentType: 'application/json',
    success,failure
  }
  $.ajax(settings)
}

function putReview (review, success, failure){
  console.log('put review')
  console.log(review)
  const settings = {
    url: `/api/review/${review.id}`,
    type: 'PUT',
    data: JSON.stringify(review),
    dataType: 'json',
    contentType: 'application/json',
    success,
    failure
  }
  $.ajax(settings)
}

function deleteReview (id, success, failure){
  const settings = {
    url: `/api/review/${id}`,
    type: 'DELETE',
    dataType: 'json',
    success,failure
  }
  $.ajax(settings)
}

// APP FUNCTIONS

function renderReview(review) {
  return `<li><h3>${review.venue}</h3><button class="editReview" data-reviewid=${review.id}>Edit</button>
  <button class="deleteReview" data-reviewid=${review.id}>Delete</button>
  <p>${review.chairReview}</p>
  </li>`
}

function renderReviews(reviews) {
  return `<ul>${reviews.map(renderReview).join("\n")}</ul>`
}

function displayNewReviews(data) {
  console.log(data)
  $('main').html(
    renderReviews(data)//NEED TO SORT BY DATE!!
  )
}

function getAndDisplayNewReviews() {
  getAllReviews(displayNewReviews, function(err){
      console.log('error getting All Reviews')
    })
}

function renderReviewForm(review) {
  const reviewDataID = review?`data-reviewid =${review.id}`:''
//review undefined if no review passed
  return `<h2> Add a review</h2>
  <form id="${review?'chairEditForm':
    'chairAddForm'}"${review?reviewDataID:""}>
    <label for="venue">Venue:</label>
    <input type="text" id="venueInput" name="venue"> </input>
    <label for="review">Chair Review:</label>
    <input type="text" id="reviewInput" name="chairReview"> </input>
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
  $('main').html(renderReviewForm(review))
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

function handleEditReview(event){
  const reviewID = $(event.currentTarget).data().reviewid
  getReview(reviewID, displayEditForm,handleApiError)
}

function handleAddFormSubmit(event) {
  event.preventDefault()
  const review = {
    venue : $('#venueInput').val(),
    chairReview : $('#reviewInput').val(),
    userName : $('#userNameInput').val()
  }
  postReview(review, getAndDisplayNewReviews, handleApiError)
}

function handleEditFormSubmit(event){
  event.preventDefault()
  const reviewID = $(event.currentTarget).data().reviewid
  const review = {
    id:reviewID,
    venue : $('#venueInput').val(),
    chairReview : $('#reviewInput').val(),
    userName : $('#userNameInput').val()
  }
  putReview(review, getAndDisplayNewReviews, handleApiError)
}

function handleSearchFormSubmit(userName) {
  event.preventDefault()
  const element = NEW_REVIEWS.newReviews.filter(function(review) {
    return review.venue.toLowerCase().trim() == $('#venueSearch').val().toLowerCase()
      .trim()
  })
  getAndDisplayNewReviews()
}

function handleDeleteReview(event){
    const reviewID = $(event.currentTarget).data().reviewid
    deleteReview(reviewID, getAndDisplayNewReviews, handleApiError)
}

function handleApiError(err){
  console.error(err)
}

//LOGIN

function displayLoginForm(){
  $('main').html(
    renderLoginForm()
  )}

  function displayNewUserForm(){
    $('main').html(
      renderNewUserForm()
    )}

function renderLoginForm(){
  return `<form id="userLogin">
    <label for="userName">UserName:</label>
    <input type="text" id="userNameInput" name="userName"> </input>
    <label for="userPassword">Password:</label>
    <input type="text" id="userPasswordInput" name="userPassword"></input>
    <input type="submit"></input>
  </form>`
}
function renderNewUserForm(){
  return `<form id="newUserLogin">
    <label for="userName">New Username:</label>
    <input type="text" id="userNameInput" name="userName"> </input>
    <label for="userPassword">New Password:</label>
    <input type="text" id="userPasswordInput" name="userPassword"></input>
    <input type="submit"></input>
  </form>`
}

function postUserLogin(userData, success, failure){
  console.log(userData)
  const settings = {
    url: '/api/auth/login',
    type: 'POST',
    data: userData,
    dataType: 'json',
    success: function(data){
      jwt = data.authToken
      console.log(`jwt:${jwt}`)
    //  console.log(atob(jwt))
      success(data)
    },
    failure
  }
  $.ajax(settings)
}

function postNewUserLogin(userData, success, failure){
  console.log(userData)
  const settings = {
    url: '/api/auth/login',
    type: 'POST',
    data: userData,
    dataType: 'json',
    success: function(data){

      success(data)
    },
    failure
  }
  $.ajax(settings)
}

function handleUserLoginSubmit(event) {
  event.preventDefault()
  const userLogin = {
    username : $('#userNameInput').val(),
    password : $('#userPasswordInput').val()
  }
  postUserLogin(userLogin, getAndDisplayUserReviews, handleApiError)
}

function handleUserLoginSubmit(event) {
  event.preventDefault()
  const userLogin = {
    username : $('#userNameInput').val(),
    password : $('#userPasswordInput').val()
  }
  //change success to 'new user created'
  postNewUserLogin(userLogin, getAndDisplayUserReviews, handleApiError)
}


function getAndDisplayUserReviews(){


}

//EVENT HANDLERS
function setupUIHandlers() {
  $('header').on('click', '#addForm', displayAddForm)
  $('header').on('click', '#loginForm', displayLoginForm)
  $('header').on('click', '#newUserForm', displayNewUserForm)
  $('header').on('click', '#main', getAndDisplayNewReviews)
  $('main').on('submit', '#userLogin', handleUserLoginSubmit)
  $('main').on('submit', '#newUserLogin', handleNewUserLoginSubmit)
  $('main').on('submit', '#chairEditForm', handleEditFormSubmit)
  $('main').on('submit', '#chairAddForm', handleAddFormSubmit)
  $('main').on('submit', '#chairSearchForm', handleSearchFormSubmit)
  $('main').on('click', '#cancelForm', getAndDisplayNewReviews)
  $('main').on('click', '.editReview', handleEditReview)
  $('main').on('click', '.deleteReview', handleDeleteReview)
}

//Fire up page

$(function() {
  getAndDisplayNewReviews()
  setupUIHandlers()
})
