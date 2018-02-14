const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {
  DATABASE_URL, PORT
} = require('./config');

// require models

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  return res.status(200).send(message);
})

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

module.exports = (runServer, app, closeServer)
