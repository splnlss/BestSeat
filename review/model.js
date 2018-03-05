const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const ReviewSchema = mongoose.Schema({
  venue: {type:String, required: true},
  chairReview: {type:String, required: true},
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
      userName: this.userName,
      publishedAt: this.publishedAt
  }
}

const ChairReview = mongoose.model('ChairReview', ReviewSchema)

module.exports = {ChairReview}
