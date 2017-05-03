const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { dbAddr, PORT, log_level } = require('./config')

//Setting up DB settings
mongoose.Promise = global.Promise
mongoose.connect(dbAddr)
const db = mongoose.connection

db.on('error', (err) =>{
  console.log(err)
})

db.once('open', () => {
  console.log('Connected to mongodb')
})

//Setting up middleware
app.use(morgan(log_level))

//Setting up express routes
const routes = require('./routes')(app, mongoose)

//Starting the server
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
})
