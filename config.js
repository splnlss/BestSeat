//remove direct link to pull from Heroku settings instead

exports.DATABASE_URL = "mongodb://admin:password27@ds147228.mlab.com:47228/bestseat"
//process.env.DATABASE_URL || 'mongodb://localhost/bestseat-app'

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/test-bestseat-app'
exports.PORT = process.env.PORT || 8080
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret'
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d'

console.log(exports.DATABASE_URL)
// should be in config heroku
