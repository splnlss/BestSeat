const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const ReviewSchema = mongoose.Schema({
  venue: {type:String, required: true},
  chairReview: {type:String, required: true},
  imageURL: {type:String, required:false},
  address:{type:String, required:false},
  phone:{type:String, required:false},
  price:{type:String, required:false},
  yelpUrl:{type:String, required:false},
  userName: {type:String, required: true},
  publishedAt: {type:Date, default: new Date()}
})

ReviewSchema.statics.findByVenue =  function(venue){
  return this.where("venue", venue)
}

ReviewSchema.methods.serialize = function(){
  return {
      id: this._id,
      venue: this.venue,
      chairReview: this.chairReview,
      imageURL: this.imageURL,
      address: this.address,
      phone:this.phone,
      price:this.price,
      yelpUrl:this.yelpUrl,
      userName: this.userName,
      publishedAt: this.publishedAt
  }
}

const ChairReview = mongoose.model('ChairReview', ReviewSchema)

module.exports = {ChairReview}
