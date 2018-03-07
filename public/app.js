// const freeSoundAPI = (search) =>{
//   const settings = {
//     url: FREESOUND_SEARCH_URL,
//     type: 'GET',
//     dataType: 'jsonp',
//     data:{
//       format: 'jsonp',
//       for: 'results:*',
//       query: search,
//       token: TOKEN,
//       count: 12,
//       fields: "name,id,username,url,previews" // description
//     },
//     success: (data) => { importData(data.results) },
//     failure: (error) => { console.log(`error: ${error}`)
//       noSearchResults()
//    }
//   }
//   $.ajax(settings)
// }

function getAllReviews (success, failure){
  const settings = {
    url: '/api/review',
    type: 'GET',
    dataType: 'json',
    success,failure
  }
  $.ajax(settings)
}

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
  const review = NEW_REVIEWS.newReviews.find(function (review){
    return review.id == $(event.currentTarget).data().reviewid
  })
//  console.log(`handleEditReview: Review = ${review}`)
  displayEditForm(review)
}

function handleAddFormSubmit(event) {
  event.preventDefault()
  NEW_REVIEWS.newReviews.push({
    "venue": $('#venueInput').val(),
    "chairReview": $('#reviewInput').val(),
    "userName": $('#userNameInput').val()
  })
  getAndDisplayNewReviews()
}

function handleEditFormSubmit(event){
  event.preventDefault()
  const review = NEW_REVIEWS.newReviews.find(function (review){
    return review.id == $(event.currentTarget).data().reviewid
  })
  review.venue = $('#venueInput').val()
  review.chairReview = $('#reviewInput').val()
  review.userName = $('#userNameInput').val()
  getAndDisplayNewReviews()
}

function handleSearchFormSubmit(event) {
  event.preventDefault()
  const element = NEW_REVIEWS.newReviews.filter(function(review) {
    return review.venue.toLowerCase().trim() == $('#venueSearch').val().toLowerCase()
      .trim()
  })
  getAndDisplayNewReviews()
}

function handleDeleteReview(event){
  const review = NEW_REVIEWS.newReviews.find(function (review){
    return review.id == $(event.currentTarget).data().reviewid
  })
    const removeIndex = NEW_REVIEWS.newReviews.indexOf(review)
    displayNewReviews(NEW_REVIEWS.newReviews.splice(removeIndex,1))
}

$(function() {
  getAndDisplayNewReviews()
  setupUIHandlers()
})
