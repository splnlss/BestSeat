exports.DATABASE_URL = process.env.DATABASE_URL ||
  'mongodb://localhost/bestseat-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/test-bestseat-app';
exports.PORT = process.env.PORT || 8080;

// mongodb://<dbuser>:<dbpassword>@ds147228.mlab.com:47228/bestseat
