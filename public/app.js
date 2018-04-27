let jwt

//PAGE AJAX CALLS
function getAllReviews (success, failure){
  const settings = {
    url: `/api/review`,
    type: 'GET',
    dataType: 'json',
    data:{},
    success: function(data){
      if (data.length>0){
        success(data)
      }else{
        failure()
      }
    }
  }
  if (jwt){
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

function searchAndGetAllReviews (success, failure, searchTerm){
  const settings = {
    url: `/api/review?searchTerm=${searchTerm}`,
    type: 'GET',
    dataType: 'json',
    data:{},
    success: function(data){
      if (data.length>0){
        success(data)
      }else{
        failure()
      }
    }
  }
  if (jwt){
    settings.headers = { Authorization: `Bearer ${jwt}` }
  }
  $.ajax(settings)
}

function postReview (review, success, failure){
  const settings = {
    url: '/api/review',
    type: 'POST',
    data: JSON.stringify(review),
    dataType: 'json',
    contentType: 'application/json',
    success:function(data){
      console.log(review)
      getAndDisplayNewReviews()
    },failure
  }
  if (jwt){
  settings.headers = { Authorization: `Bearer ${jwt}` }
  }
  $.ajax(settings)
}

function putReview (review, success, failure){
  console.log('put review')
  const settings = {
    url: `/api/review/${review.id}`,
    type: 'PUT',
    data: JSON.stringify(review),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data){
      console.log(data)
    },
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

// Yelp Search
function searchYelp (searchTerms, success, error){
  console.log(searchRequest)

  const settings = {

    url:`/api/yelp`,
    type: 'GET',
    data: searchRequest,
    dataType: 'json',
    success,error
  }
  $.ajax(settings)
}

const searchRequest = {
  term:'Joe Coffee',
  location: '13th street, New York'
};

function displaySearchYelp(){
      searchYelp(searchRequest,function (data,text){
       console.log(arguments)
        console.log(data,text)
    })
      // console.log(data)
}


// function searchRequest (searchVenue,searchLocation){
//
// }

// APP FUNCTIONS

function displayHeader(){
  $('header').html(
    renderHeader()
  )
}

function renderHeader(){
  // const titleLink = `<a id="title">Best Seat In The House</a>`
  const addLink = `<a class="nav-link" href="#" id="addForm">Add</a>`
  const logInLink = `<a class="nav-link" href="#" id="loginForm">Login</a>`
  const newUserLink = `<a class="nav-link" href="#" id="newUserForm">New User</a>`
  const searchLink = `<a class="nav-link" href="#" id="searchForm">Search</a>`
  const logOutLink = `<a class="nav-link" href="#" id="logOut">Logout</a>`
  const loggedIn = [addLink, logOutLink, searchLink]
  const loggedOut = [logInLink, newUserLink, searchLink]
  const links = jwt?loggedIn:loggedOut

  const navLinks = function(){
        links.forEach(function(link){
          `<li class="nav-item">
          ${link}
          </li>`
          return link
          // return links.join("; ")
        })
        return `${links.join("")}`
      }

  const navBar = `<nav class="navbar fixed-top navbar-light navbar-expand-lg">
    <a class="navbar-brand" id="title" href="#">Best Seat In The House </a>
    <button class="navbar-toggler " type="button" data-toggle="dropdown" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse dropdown-menu show dropdown-menu-right" id="navbarNav">
      <ul class="navbar-nav">
      ${navLinks()}
      </ul>
    </div>
  </nav>`
  // <h1>${titleLink}</h1>
  // <nav>${links.join(` / `)}</nav>
  // `
  return navBar
}

//changed from button to a link
function renderReview(review) {
const editReview = `<a class="editReview" data-reviewid=${review.id}>Edit</a>
  <a class="deleteReview" data-reviewid=${review.id}>Delete</a>`
  return `<li><ul>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <img class="reviewIMG" src="${review.imageURL}" alt="venue image">
      </div>
      <div class="col-8">
        <ul><h2>${review.venue}</h2></ul>
        <ul><span>${review.chairReview}</span></ul>
        <ul>${jwt?editReview:""}</ul>
      </div>
    </div>
  </div>
  </ul>
  </li>
  <svg width="250" height="1" viewBox="0 0 300 1"
    xmlns="http://www.w3.org/2000/svg">
  <line x1="0" x2="300"
      stroke-width="1" stroke="#af9b95"/>
</svg>`
}

function renderReviews(reviews) {
  console.log(reviews)
  return `<ul>${reviews.map(renderReview).join("\n")}</ul>`
}

function displayNewReviews(data) {

  $('main').html(
    renderReviews(data)//NEED TO SORT BY DATE!!
  )
}

function getAndDisplayNewReviews() {
  displayHeader()
  getAllReviews(displayNewReviews, noReviews)
  setupUIHandlers()
}

function searchAndDisplayNewReviews(searchTerm){
  searchAndGetAllReviews(displayNewReviews, noSearchResults, searchTerm)
}

function renderReviewForm(review) {
  const reviewDataID = review?`data-reviewid =${review.id}`:''
//review undefined if no review passed
  return `<h2> Add a review</h2>
  <form id="${review?'chairEditForm':
    'chairAddForm'}"${review?reviewDataID:""}>
    <div><label for="venue">Venue:</label>
    <input type="text" id="venueInput" name="venue" placeholder="Enter venue name"> </input></div>
    <div><label for="review">Chair Review:</label>
    <input type="text" id="reviewInput" name="chairReview" placeholder="Enter review"> </input>
    </div>
    <div><label for="imageURL">Add image URL</label>
    <input type="url" id="imageInput" name="imageURL" placeholder="http://domain.com/image.jpg"> </input>
    </div>
    <div id="formButtons">
      <input type="button" id="cancel" value="cancel"></input>
      <input type="submit" id="submit" value="submit review"></input>
    </div>
  </form>`
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
  $('#imageInput').val(review.imageURL)
}

function renderSearchForm() {
  return ` <h2>Search By Venue</h2>
  	<form id="chairSearchForm">
    <label for="venue">Venue:</label>
    <input type="text" id="venueSearch" name="venueSearch" placeholder="Enter venue name"> </input>
    <div>
      <input type="button" id="cancel" value="cancel"></input>
      <input type="submit" id="submit" value="search"></input>
    </div>
  </form>  `
}

function displaySearchForm() {
  $(`main`).html(
    renderSearchForm()
  )
}

function noSearchResults(){
    $('main').append(`
      <section role="region" id="instructions" aria-live="assertive">
        <span> Venue Not Found. Please check spelling and try again. </span>
      </section>
      `)
    //getAndDisplayNewReviews() //recursion
    }
  function noReviews(){
        $('main').html(`
          <section role="region" id="instructions" aria-live="assertive">
            <span>No Reviews</span>
          </section>
          `)
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
    imageURL: $('#imageInput').val()
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
    imageURL: $('#imageInput').val()
  }
  console.log(review)
  putReview(review, getAndDisplayNewReviews, handleApiError)
}

function handleSearchFormSubmit(event) {
  event.preventDefault()
  searchAndDisplayNewReviews($('#venueSearch').val().trim())
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
    // $('.login-form').toggle();
    renderLoginForm()
  )}

function displayNewUserForm(){
    $('main').html(
      renderNewUserForm()
    )}
//
function renderLoginForm(){
  return `<form id="userLogin">
    <h2>Login</h2>
    <div>
      <label for="userName">Username:</label>
      <input type="text" id="userNameInput" name="userName" placeholder="Enter username"> </input>
    </div>
    <div>
      <label for="userPassword">Password:</label>
      <input type="password" id="userPasswordInput" name="userPassword" placeholder="Enter password"></input>
    </div>
    <div>
      <input type="button" id="cancel" value="cancel"></input>
      <input type="submit" id="submit" value="login"></input>
    </div>
  </form>`
}
function renderNewUserForm(){
  return `<form id="newUserLogin">
    <div><h2>Create New User</h2></div>
    <label for="userName">Username:</label>
    <input type="text" id="userNameInput" name="userName" placeholder="Enter username"> </input><br>
    <label for="userPassword">Password: </label>
    <input type="text" id="userPasswordInput" name="userPassword" placeholder="Enter password"></input>
    <div>
      <input type="button" id="cancel" value="cancel"></input>
      <input type="submit" id="submit" value="create user"></input>
    </div>
  </form>`
}

function postUserLogin(userData, success, failure){
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
//why is failure being called with succes as well??
    failure: userNotFound()
  }
  $.ajax(settings)
}

function userNotFound(){
  console.log('posting user error')
  $('main').append(`
    <section role="region" id="instructions" aria-live="assertive">
      <span>User or password not found. Please check spelling and try again.</span>
    </section>
    `)
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
  $('nav').on('click', '#addForm', displayAddForm)
  $('nav').on('click', '#loginForm', displayLoginForm)
  $('nav').on('click', '#newUserForm', displayNewUserForm)
  $('nav').on('click', '#title', getAndDisplayNewReviews)
  $('nav').on('click', '#logOut', logOutUser)
  $('nav').on('click', '#searchForm', displaySearchYelp)
  // displaySearchForm)
  $('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide')
    })
  $('main').on('submit', '#userLogin', handleUserLoginSubmit)
  $('main').on('submit', '#newUserLogin', handleNewUserLoginSubmit)
  $('main').on('submit', '#chairEditForm', handleEditFormSubmit)
  $('main').on('submit', '#chairAddForm', handleAddFormSubmit)
  $('main').on('submit', '#chairSearchForm', handleSearchFormSubmit)
  $('main').on('click', '#cancel', getAndDisplayNewReviews)
  $('main').on('click', '#cancelForm', getAndDisplayNewReviews)
  $('main').on('click', '.editReview', handleEditReview)
  $('main').on('click', '.deleteReview', handleDeleteReview)
}

//Fire up page

$(function() {
  //displayHeader()
  getAndDisplayNewReviews()
//  setupUIHandlers()
})
