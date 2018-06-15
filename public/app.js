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
  setTimeout(function(){
    $("button.hamburger").click(function(){
      $(".hamburger").toggleClass("is-active");
      $(".nav_menu").toggleClass("hidden")
  })},0)
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

function renderLandingPage(){
  console.log('render landing page')
  return `<div class="outer-flex-dialogBox">
       <div class="inner-flex-dialogBox">
            <span id="close">X</span>
            <h3>Welcome to The Best Seat</h3>
            <i>a place to review chairs</i>
            <p>This site is dedicated to those of us with debilitating back pain, chronic health issues or other handicaps. Nothings worse then spending money on a fancy meal only to walk away in pain.</p>
            <p>Please add your own reviews and post photos of your favorite or worst seats.</p>
            <p>To post a review you must first login, then use the 'create a review' form to search for the restaurant then add review. Account creation is open.</p><p>User:guest  Password:0123456789</p>
         <div id="formButtons">
           <input type="button" id="introNewUser" value="Create Account"></input>
           <input type="button" id="introLogin" value="Login"></input>
        </div>
       </div>
     </div>`
}

function renderReview(review) {
const editReview = `<a class="editReview" data-reviewid=${review.id}>Edit</a>
  <a class="deleteReview" data-reviewid=${review.id}>Delete</a>`

  return `<div class="review_container"><img src="${review.imageURL}" alt="Chair Review Image" class="review_image centered-and-cropped" id="venueName" data-reviewid=${review.id}>
    <ul class="review__text">
      <li class="review_item" id="venueName" data-reviewid=${review.id}><h3>${review.venue}</h3></li>
      <li class="review_item">${jwt?editReview:""}</li>
      <li class="review_item"><span>${review.chairReview}</span></li>
    </ul>
  </div>`
}

function renderReviewPage(review){
  const editReview = `<a class="editReview" data-reviewid=${review.id}>Edit</a>
    <a class="deleteReview" data-reviewid=${review.id}>Delete</a>`

    return `<div class="review_page"> <img src="${review.imageURL}" alt="Chair Review Image" class="review_image centered-and-cropped-Large">
      <ul class="review__text">
        <li class="review_item"><h2>${review.venue}</h2></li>
        <li class="review_item">Author: ${review.userName} ${jwt?editReview:""}</li>
        <li class="review_item"><span>Address: ${review.address}</span></li>
        <li class="review_item"><span>Phone: ${review.phone}</span></li>
        <li class="review_item"><span>Price: ${review.price}</span></li>
        <lilass="review_item"><span>Yelp info: <a href="#" onClick="MyWindow=window.open('${review.yelpUrl}','MyWindow','width=600,height=600'); return false;">more info...</a>
        <li class="review_item"><span><h4>Review:</h4> ${review.chairReview}</span></li>
      </ul>
    </div>`
}


function renderYelpReviewForm(data) {
  console.log(data)
  return `<div class="review_container">
  <img src="${data.image_url}" alt="Chair Review Image" class="review_image centered-and-cropped-Large">
  <h2>Add Review</h2>
  <form id="chairAddForm'>
  <ul>
    <li></li>
    <li class="review_item"><label for="venue">Venue:</label>
    <input type="text" id="venueInput" name="venue" value="${data.name}" size="50"></li>

    <li class="review_item"><label for="address">Address:</label>
    <input type="text" id="addressInput" name="address" value="${data.location.address1}, ${data.location.city}, ${data.location.zip_code}" size="50"></li>
    <li><label for="url" class="review_item">Image URL: </label>
    <input type="text" id="image_url" name="image_url" value="${data.image_url}" size="50"></li>
    <li><label for="text" class="review_item">Phone: </label>
    <input type="text" id="phone" name="phone" value="${data.phone}" size="50"></li>
    <li><label for="text" class="review_item">Price: </label>
    <input type="text" id="price" name="price" value="${data.price}" size="50"></li>
    <li><label for="text" class="review_item">Yelp Url: </label>
    <input type="text" id="yelpUrl" name="yelpUrl" value="${data.url}" size="50"></li>
    <li class="review_item"><label for="review">Write Chair Review: </label></li>
    <li><textarea type="text" id="reviewInput" name="chairReview" rows="10" cols="50"></textarea></li>
  </ul>
  <div id="formButtons">
    <input type="button" id="cancel" value="cancel"></input>
    <input type="submit" id="submit_chairAddForm" value="submit review"></input>
  </form><div id="errormsg"></div>
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

function displayReviewPage(review){
  console.log(review)
  $('main').html(
    renderReviewPage(review)
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
      $('#submit_chairAddForm').click(handleAddFormSubmit)
  },0)
}


function searchAndDisplayNewReviews(searchTerm){
  displayHeader()
  searchAndGetAllReviews(displayNewReviews, noSearchResults, searchTerm)
}

function searchYelpVenueForm(){
  return `<div class="form_container">
  <h2>Find Venue</h2>
  <form id="searchYelpVenueForm">
    <div><label for="venue">Search For Venue:</label>
    <input type="text" id="venueInput" name="venue" size="50"> </input></div>
    <p id="instructions">At the moment only places in New York City are available.</p>
    <div id="formButtons">
      <input type="button" id="cancel" value="cancel"></input>
      <input type="submit" id="chairAddYelpFormSearch" value="search"></input>
    </div>
  </form><div id="errormsg"></div></div>`
}

function renderReviewForm(review) { //edit form
  const reviewDataID = review?`data-reviewid =${review.id}`:''
  return `<div class="review_container">
  <img src="${review.imageURL}" alt="Chair Review Image" class="review_image centered-and-cropped-Large">
  <form id="chairEditForm'>
  <ul>
    <li><h2>Edit Review</h2></li>
    <li class="review_item"><label for="venue">Venue:</label>
    <input type="text" id="venueInput" name="venue" value="${review.name}" size="50"></li>

    <li class="review_item"><label for="address">Address:</label>
    <input type="text" id="addressInput" name="address" value="${review.address}" size="50"></li>
    <li><label for="url" class="review_item">Image URL: </label>
    <input type="text" id="image_url" name="image_url" value="${review.imageURL}" size="50"></li>
    <li><label for="text" class="review_item">Phone: </label>
    <input type="text" id="phone" name="phone" value="${review.phone}" size="50"></li>
    <li><label for="text" class="review_item">Price: </label>
    <input type="text" id="price" name="price" value="${review.price}" size="50"></li>
    <li><label for="text" class="review_item">Yelp Url: </label>
    <input type="text" id="yelpUrl" name="yelpUrl" value="${review.url}" size="50"></li>
    <li class="review_item"><h4><label for="review">Write Chair Review: </label></h4></li>
    <li><textarea type="text" id="reviewInput" name="chairReview" rows="10" cols="50" value="${review.chairReview}"></textarea></li>
  </ul>
  <div id="formButtons">
    <input type="button" id="cancel" value="cancel"></input>
    <input type="submit" id="submit_chairEditForm" data-reviewid="${review.id}" value="submit review"></input>
  </form><div id="errormsg"></div>
  </div>
  <div id="errormsg"></div></div>`
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
  setTimeout(function (){
    $('#submit_chairEditForm').click(function(event){
      event.preventDefault()
      handleEditFormSubmit(event)})
  },0)
}

function renderSearchForm() {
  return ` <div class="form_container">
  <h2>Search By Venue</h2>
  	<form id="chairSearchForm">
    <label for="venue">Venue:</label>
    <input type="text" id="venueSearch" name="venueSearch" size="auto"> </input>
    <div>
      <input type="button" id="cancel" value="cancel"></input>
      <input type="submit" id="submit" value="search"></input>
    </div>
  </form><div id="errormsg"></div></div>  `
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
  console.log(reviewID)
  getReview(reviewID, displayEditForm,handleApiError)
}

function handleReviewSelect(event){
  const reviewID = $(event.currentTarget).data().reviewid
  console.log(reviewID)
  getReview(reviewID, displayReviewPage, handleApiError)
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
    phone:$('#phone').val(),
    price:$('#price').val(),
    yelpUrl: $('#yelpUrl').val(),
  }
  postReview(review, getAndDisplayNewReviews, handleApiError)
}

function handleEditFormSubmit(event){
  console.log()
  event.preventDefault()
  const reviewID = $(event.currentTarget).data("reviewid")
  console.log($(event.currentTarget).data())
  const review = {
    id: reviewID,
    venue : $('#venueInput').val(),
    address : $('#addressInput').val(),
    imageURL : $('#image_url').val(),
    chairReview : $('#reviewInput').val(),
    phone:$('#phone').val(),
    price:$('#price').val(),
    yelpUrl: $('#yelpUrl').val(),
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
}

//LOGIN

function displayLoginForm(){
  $('main').html(
    renderLoginForm()
  )}

function displayNewUserForm(){
    $('main').html(
      renderNewUserForm()
    )
  }
//
function renderLoginForm(){
  return `<div class="form_container">
  <form id="userLogin">
    <h2>Login</h2>
    <div>
    <label for="userName">Username:</label>
    <input type="text" id="userNameInput" name="userName"> </input></div>
    <div><label for="userPassword">Password: </label>
    <input type="text" id="userPasswordInput" name="userPassword"></input></div>
    <div id="formButtons">
    <input type="button" id="cancel" value="cancel"></input>
    <input type="submit" id="submit" value="login"></input>
    </div>
  </form>
  <div id="errormsg"></div>
  </div>`
}

function renderNewUserForm(){
  return `<div class="form_container">
  <form id="newUserLogin">
    <div><h2>Create New User</h2></div>
    <label for="userName">Username:</label>
    <input type="text" id="userNameInput" name="userName"> </input><br>
    <label for="userPassword">Password: </label>
    <input type="text" id="userPasswordInput" name="userPassword"></input>
    <div id="formButtons">
      <input type="button" id="cancel" value="cancel"></input>
      <input type="submit" id="submit" value="create user"></input>
    </div>
  </form>
  <div id="errormsg"></div>
  </div>`
}

function postUserLogin(userData, success, error){
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
    error: noUserFoundError()
    //why does this always run even if it's successful??
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
  postUserLogin(userLogin, getAndDisplayNewReviews, noUserFoundError)
}

function handleNewUserLoginSubmit(event) {
  event.preventDefault()
  const newUserLogin = {
    username : $('#userNameInput').val(),
    password : $('#userPasswordInput').val()
  }
  //change success to 'new user created'
  postNewUserLogin(newUserLogin, displayLoginForm, handleApiError)
}

function logOutUser(){
  jwt = ""
  getAndDisplayNewReviews()
  console.log('logged out')
}

function noUserFoundError(){
    $('#errormsg').html(`
      <section role="region" id="instructions" aria-live="assertive">
        <span> Username and/or password is incorrect.</span>
      </section>
      `)
    }

// Yelp Search
function searchYelp (searchTerm, success, error){
  const searchRequest = {
    term: searchTerm.venue,
    location: 'New York, NY'
  };

  const settings = {

    url:`/api/yelp`,
    type: 'GET',
    data: searchRequest,
    dataType: 'json',
    success,error
  }
  $.ajax(settings)
}

//EVENT HANDLERS
function setupUIHandlers() {
  $('header').on('click', '#addForm', displayAddForm)
  $('header').on('click', '#loginForm', displayLoginForm)
  $('header').on('click', '#newUserForm', displayNewUserForm)
  $('header').on('click', '#title', getAndDisplayNewReviews)
  $('header').on('click', '#logOut', logOutUser)
  $('main').on('click', '#close', getAndDisplayNewReviews)
  $('main').on('click', '#introNewUser', displayNewUserForm)
  $('main').on('click', '#introLogin', displayLoginForm)
  $('header').on('click', '#searchForm', displaySearchForm)
  $('main').on('submit', '#userLogin', handleUserLoginSubmit)
  $('main').on('submit', '#newUserLogin', handleNewUserLoginSubmit)
6
  // $('main').on('submit', '#chairAddYelpFormSearch', searchYelpVenueForm)
  // $('main').on('submit', '#chairAddForm', handleAddFormSubmit)
  $('main').on('submit', '#chairSearchForm', handleSearchFormSubmit)
  $('main').on('click', '#cancel', getAndDisplayNewReviews)
  $('main').on('click', '#cancelForm', getAndDisplayNewReviews)
  $('main').on('click', '.editReview', handleEditReview)
  $('main').on('click', '.deleteReview', handleDeleteReview)
  $('main').on('click', '#venueName', handleReviewSelect)
  //handleReviewSelect
  // $('main').on('click', '#venueName', function (){
  //   console.log(this.review)
  //   displayReviewPage(this.review)
  // })
}

//Fire up page

$(function() {
  getAndDisplayNewReviews()
  setTimeout(function(){
     $('main').append(renderLandingPage())
     setupUIHandlers()
   }, 500)
})
