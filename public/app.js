let jwt

//PAGE AJAX CALLS
function getAllReviews (success, failure, searchTerm, shouldDisplayAll=true){
  const settings = {
    url: `/api/review${searchTerm?`?searchTerm=${searchTerm}`:""}`,
    type: 'GET',
    dataType: 'json',
    data:{},
    success,failure
  }
  if (jwt){
    if (shouldDisplayAll){
      settings.data.shouldDisplayAll = shouldDisplayAll
    }
    settings.headers = { Authorization: `Bearer ${jwt}` }
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
  if (jwt){
  settings.headers = { Authorization: `Bearer ${jwt}` }
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
  if (jwt){
  settings.headers = { Authorization: `Bearer ${jwt}` }
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
  if (jwt){
  settings.headers = { Authorization: `Bearer ${jwt}` }
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
  if (jwt){
  settings.headers = { Authorization: `Bearer ${jwt}` }
  }
  $.ajax(settings)
}

// APP FUNCTIONS

function displayHeader(){
  $('header').html(
    renderHeader()
  )
}

function renderHeader(){
  const titleLink = `<a id="title">Best Seat In The House</a>`
  const addLink = `<a id="addForm">Add</a>`
  const logInLink = `<a id="loginForm">Login</a>`
  const newUserLink = `<a id="newUserForm">New User</a>`
  const searchLink = `<a id="searchForm">Search</a>`
  const logOutLink = `<a id="logOut">Logout</a>`
  const loggedIn = [addLink, searchLink, logOutLink]
  const loggedOut = [searchLink, logInLink, newUserLink]
  const links = jwt?loggedIn:loggedOut

  return `<h1>${titleLink}</h1>
  <nav>${links.join(` / `)}</nav>`
}

//changed from button to a link
function renderReview(review) {
const editReview = `<a class="editReview" data-reviewid=${review.id}>Edit</a>
  <a class="deleteReview" data-reviewid=${review.id}>Delete</a>`
  return `<li><h3>${review.venue}</h3>
  ${jwt?editReview:""}
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

function getAndDisplayNewReviews(searchTerm, shouldDisplayAll) {
  displayHeader()
  getAllReviews(displayNewReviews, function(err){
      console.log('error getting All Reviews')
    },
    searchTerm, shouldDisplayAll)
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
  return ` <h2>Search By Venue</h2>
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

function handleSearchFormSubmit(event) {
  event.preventDefault()
  getAndDisplayNewReviews($('#venueSearch').val().trim())
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
//
function renderLoginForm(){
  return `<form id="userLogin">
    <div>
    <label for="userName">Username:</label>
    <input type="text" id="userNameInput" name="userName"> </input></div>
    <div><label for="userPassword">Password: </label>
    <input type="text" id="userPasswordInput" name="userPassword"></input></div>
    <div><input type="submit" value="login"></input></div>
  </form>`
}
function renderNewUserForm(){
  return `<form id="newUserLogin">
    <label for="userName">Username:</label>
    <input type="text" id="userNameInput" name="userName"> </input><br>
    <label for="userPassword">Password: </label>
    <input type="text" id="userPasswordInput" name="userPassword"></input><br>
    <input type="submit" value="create user"></input>
  </form>`
}

function postUserLogin(userData, success, failure){
  console.log(userData)
  const settings = {
    url: '/api/auth/login',
    type: 'POST',
    data: JSON.stringify(userData),
    dataType: 'json',
    contentType: 'application/json',
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
    url: '/api/user',
    type: 'POST',
    data: JSON.stringify(userData),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data){
      //run user.create
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
  postUserLogin(userLogin, getAndDisplayNewReviews, handleApiError)
}

function handleNewUserLoginSubmit(event) {
  event.preventDefault()
  const newUserLogin = {
    username : $('#userNameInput').val(),
    password : $('#userPasswordInput').val()
  }
  //change success to 'new user created'
  postNewUserLogin(newUserLogin, getAndDisplayNewReviews, handleApiError)
}

function logOutUser(){
  jwt = ""
  getAndDisplayNewReviews()
  console.log('logged out')
}

//EVENT HANDLERS
function setupUIHandlers() {
  $('header').on('click', '#addForm', displayAddForm)
  $('header').on('click', '#loginForm', displayLoginForm)
  $('header').on('click', '#newUserForm', displayNewUserForm)
  $('header').on('click', '#title', getAndDisplayNewReviews)
  $('header').on('click', '#logOut', logOutUser)
  $('header').on('click', '#searchForm', displaySearchForm)
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
