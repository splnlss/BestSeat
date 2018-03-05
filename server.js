const express = require('express')

const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const {DATABASE_URL, PORT} = require('./config')
const {router:reviewRouter} = require('./review')
// require models

const app = express()

app.use(morgan('common'))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/api/review/', reviewRouter)
// app.use('*', function (req, res) {
//   res.status(404).json({ message: 'Not Found' });
// })

let server

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
