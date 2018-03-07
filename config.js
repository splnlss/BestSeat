exports.DATABASE_URL = process.env.DATABASE_URL ||
  'mongodb://localhost/bestseat-app'
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/test-bestseat-app'
exports.PORT = process.env.PORT || 8080
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret'
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d'

// mongodb://<admin>:<password27$$>@ds147228.mlab.com:47228/bestseat
// should be in config heroku
