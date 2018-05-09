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
    },
    failure
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
    },
    failure
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
  // setTimeout(() => {
  //   $('#loginForm').click(() => {
  //   alert('greuzzi');
  //   });
  // } , 0);
}

function renderHeader(){
  const titleLink = `<a id="title">Best Seat In The House</a>`
  const addLink = `<a id="addForm">Create Review</a>`
  const logInLink = `<a id="loginForm">Login</a>`
  const newUserLink = `<a id="newUserForm">New User</a>`
  const searchLink = `<i class="fas fa-search" id="searchForm"></i>`
  //<a id="searchForm">Search</a>
  const logOutLink = `<a id="logOut">Logout</a>`
  const loggedIn = [addLink, logOutLink, searchLink]
  const loggedOut = [logInLink, newUserLink, searchLink]
  const links = jwt?loggedIn:loggedOut

  return `<div class="headerContainer">
  <div class="siteHeader__section">
  <h1>${titleLink}</h1></div>
  <div class="siteHeader__section">
                  <button class="hamburger hamburger--collapse" type="button">
                      <span class="hamburger-spin">
                        <span class="hamburger-inner">
                        </span>
                      </span>
                  </button>
                  <nav class="nav_menu hidden">
                    <div class="">
                    ${links.map(function (link) {
                      return `<div class="nav_item">${link}<div>`})
                              .join('  ')
                            }
                    </div>
                  </nav>
                  </div></div>`
}

function renderReview(review) {
console.log(review)
const editReview = `<a class="editReview" data-reviewid=${review.id}>Edit</a>
  <a class="deleteReview" data-reviewid=${review.id}>Delete</a>`

  return `<div class="review_container"> <img src="${review.imageURL}" alt="Chair Review Image" class="review_image centered-and-cropped">
    <ul class="review__text">
      <li class="review_item"><h3>${review.venue}</h3></li>
      <li class="review_item">${jwt?editReview:""}</li>
      <li class="review_item"><span>${review.chairReview}</span></li>
    </ul>
  </div>`
}

function renderYelpReviewForm(data) {
console.log(data)
  return `<div class="review_container">
  <img src="${data.image_url}" alt="Chair Review Image" class="review_image centered-and-cropped">
  <form id="chairAddForm'>
  <ul>
    <li class="review_item"><label for="venue">Venue:</label>
    <input type="text" id="venueInput" name="venue" value="${data.name}"></li>

    <li class="review_item"><label for="address">Address:</label>
    <input type="text" id="addressInput" name="address" value="${data.location.address1}, ${data.location.city}, ${data.location.zip_code}"></li>

    <li class="review_item"><label for="review">Chair Review:</label>
    <textarea type="text" id="reviewInput" name="chairReview" rows="10" cols="50"></textarea></li>

    <li><label for="url" class="review_item">Image URL</label>
    <input type="text" id="image_url" name="image_url" value="${data.image_url}"></li>
  </ul>
  <div id="formButtons">
    <input type="button" id="cancel" value="cancel"></input>
    <input type="submit" id="submit_chairAddForm" value="submit review"></input>
  </form>
  </div>`
}

function renderReviews(reviews) {
  console.log(reviews)
  return `<ul>${reviews.map(renderReview).join("\n")}</ul>`
}

function displayNewReviews(data) {
  console.log(data)
  $('main').html(
    renderReviews(data)//NEED TO SORT BY DATE!!
  )
}

function getAndDisplayNewReviews() {
  console.log('getAndDisplayNewReviews')
  displayHeader()
  getAllReviews(displayNewReviews, noReviews)
}

function getAndDisplayYelpResults(data,text){
  console.log(data)
  $('main').html(
  renderYelpReviewForm(data))
  setTimeout(function (){
      $('main').on('click', '#submit_chairAddForm', handleAddFormSubmit)
  },0)
}

function searchAndDisplayNewReviews(searchTerm){
  displayHeader()
  searchAndGetAllReviews(displayNewReviews, noSearchResults, searchTerm)
}

function searchYelpVenueForm(){
  return `<div class="form_container">
  <h2 class="formTitle"> Add a review</h2>
  <form id="searchYelpVenueForm">
    <div><label for="venue">Search For Venue:</label>
    <input type="text" id="venueInput" name="venue"> </input></div>
    <p id="instructions">At the moment only places in New York City are available.</p>
    <div id="formButtons">
      <input type="button" id="cancel" value="cancel"></input>
      <input type="submit" id="chairAddYelpFormSearch" value="search"></input>
    </div>
  </form></div>`
}

function renderReviewForm(review) {
  const reviewDataID = review?`data-reviewid =${review.id}`:''
//review undefined if no review passed
  return `<div class="form_container">
  <h2 class="formTitle"> Add a review</h2>
  <form id="chairEditForm">
    <div><label for="venue">Venue:</label>
    <input type="text" id="venueInput" name="venue"></input></div>
    <div><label for="review">Chair Review:</label>
    <textarea type="text" id="reviewInput" name="chairReview" rows="10" cols="50"></textarea>
    </div>
    <div id="formButtons">
      <input type="button" id="cancel" value="cancel"></input>
      <input type="submit" id="submit" value="submit review"></input>
    </div>
  </form></div>`
}


function displayAddForm() {
  $('main').html(
    searchYelpVenueForm()
  )
  setTimeout(function (){
    $('main').on('click', '#chairAddYelpFormSearch', handleAddFormYelpSubmit)
  },0)
}

function displayEditForm(review) {
  $('main').html(renderReviewForm(review))
  $('#venueInput').val(review.venue)
  $('#reviewInput').val(review.chairReview)
  $('#userNameInput').val(review.userName)
}

function renderSearchForm() {
  return ` <div class="form_container">
  <h2 class="formTitle">Search By Venue</h2>
  	<form id="chairSearchForm">
    <label for="venue">Venue:</label>
    <input type="text" id="venueSearch" name="venueSearch"> </input>
    <div>
      <input type="button" id="cancel" value="cancel"></input>
      <input type="submit" id="submit" value="search"></input>
    </div>
  </form></div>  `
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

function handleAddFormYelpSubmit(event) {
  event.preventDefault()
  console.log('handleAddFormYelpSubmit')
  const reviewLocation = {
    venue : $('#venueInput').val(),
    // chairReview : $('#reviewInput').val(),
    // userName : $('#userNameInput').val()
  }
  console.log(reviewLocation)
  //send to yelp
  searchYelp(reviewLocation, getAndDisplayYelpResults, handleApiError)
}

function handleAddFormSubmit(event) {
  console.log('submit yelp & review : handleAddFormSubmit')
  event.preventDefault()
  const review = {
    venue : $('#venueInput').val(),
    address : $('#addressInput').val(),
    imageURL : $('#image_url').val(),
    chairReview : $('#reviewInput').val(),
  }
  postReview(review, getAndDisplayNewReviews, handleApiError)
}


function handleEditFormSubmit(event){
  console.log('submit chairEditForm')
  event.preventDefault()
  const reviewID = $(event.currentTarget).data().reviewid
  const review = {
    venue : $('#venueInput').val(),
    chairReview : $('#reviewInput').val(),
    // userName : $('#userNameInput').val()
  }
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
  console.log('shit. that didnt work')
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
  return `<div class="form_container">
  <form id="userLogin">
    <h2 class="formTitle">Login</h2>
    <div>
    <label for="userName">Username:</label>
    <input type="text" id="userNameInput" name="userName"> </input></div>
    <div><label for="userPassword">Password: </label>
    <input type="text" id="userPasswordInput" name="userPassword"></input></div>
    <div>
    <input type="button" id="cancel" value="cancel"></input>
    <input type="submit" id="submit" value="login"></input>
    </div>
  </form></div>`
}
function renderNewUserForm(){
  return `<div class="form_container">
  <form id="newUserLogin">
    <div><h2 class="formTitle">Create New User</h2></div>
    <label for="userName">Username:</label>
    <input type="text" id="userNameInput" name="userName"> </input><br>
    <label for="userPassword">Password: </label>
    <input type="text" id="userPasswordInput" name="userPassword"></input>
    <div>
      <input type="button" id="cancel" value="cancel"></input>
      <input type="submit" id="submit" value="create user"></input>
    </div>
  </form></div>`
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
    failure: (error) => {
      console.log(`error: ${error}`)
      handleApiError()
      }
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
    failure: function(error){
      console.log('New user not created. Please try again.')
    }
  }
  $.ajax(settings)
}

function handleUserLoginSubmit(event) {
  event.preventDefault()
  const userLogin = {
    username : $('#userNameInput').val(),
    password : $('#userPasswordInput').val()
  }
  postUserLogin(userLogin, getAndDisplayNewReviews, noUserFoundError)
}

function handleNewUserLoginSubmit(event) {
  event.preventDefault()
  const newUserLogin = {
    username : $('#userNameInput').val(),
    password : $('#userPasswordInput').val()
  }
  $("new user created").html
  postNewUserLogin(newUserLogin, getAndDisplayNewReviews, handleApiError)
}

function logOutUser(){
  jwt = ""
  getAndDisplayNewReviews()
  console.log('logged out')
}

function noUserFoundError(){
    $('main').append(`
      <section role="region" id="instructions" aria-live="assertive">
        <span> Username and/or password is incorrect. Please try again. </span>
      </section>
      `)
    }

// Yelp Search
function searchYelp (searchTerm, success, error){
  const searchRequest = {
    term: searchTerm.venue,
    location: 'New York, NY'
  };
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


;

// function displaySearchYelp(){
//       searchYelp(searchRequest,function (data,text){
//        console.log(arguments)
//         console.log(data,text)
//     })
//       // console.log(data)
// }

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
  $("button").click(function(){
      $(".hamburger").toggleClass("is-active");
      $(".nav_menu").toggleClass("hidden")
  })
  // $('main').on('submit', '#chairAddYelpFormSearch', searchYelpVenueForm)
  // $('main').on('submit', '#chairAddForm', handleAddFormSubmit)
  $('main').on('submit', '#chairSearchForm', handleSearchFormSubmit)
  $('main').on('click', '#cancel', getAndDisplayNewReviews)
  $('main').on('click', '#cancelForm', getAndDisplayNewReviews)
  $('main').on('click', '.editReview', handleEditReview)
  $('main').on('click', '.deleteReview', handleDeleteReview)
}

//Fire up page

$(function() {
  getAndDisplayNewReviews()
  setupUIHandlers()
})
