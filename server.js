const express = require('express')

const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
mongoose.Promise = global.Promise

const {DATABASE_URL, PORT} = require('./config')
const {router:reviewRouter} = require('./review')
const {router:userRouter} = require('./user')
const {router:yelpRouter} = require('./yelp')
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
// require models

const app = express()
let server

app.use(morgan('common'))
app.use(bodyParser.json())
app.use(express.static('public'))

// passport.use(localStrategy)
// passport.use(jwtStrategy)

app.use('/api/user', userRouter)
app.use('/api/review/', reviewRouter)
app.use('/api/auth/', authRouter)
app.use('/api/yelp', yelpRouter)

//middleware to recognize jwt
const jwtAuth = passport.authenticate('jwt', { session: false })

//route to find user by jwt
app.post('/api/userSearch', jwtAuth, (req, res)=>{
  console.log(req.user)
  return req.user
})

function runServer(databaseURL = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseURL, err => {
      if (err) {
        return reject(err)
      }
      server = app.listen(port, () => {
          console.log(`You're app is listening on ${port}`)
          resolve()
        })
        .on('error', err => {
          mongoose.disconnect()
          reject(err)
        })
    })
  })
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('closing server')
      server.close(err => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
}


if (require.main === module) {
  runServer().catch(err => console.error(err))
}

module.exports = {
  runServer, app, closeServer
}
