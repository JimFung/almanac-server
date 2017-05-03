const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { dbAddr, PORT, log_level } = require('./config')
const fs = require('fs')

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

//Setting up logging
let log_stream = fs.createWriteStream(`${new Date().toDateString()}.log`, {flags: 'a'})
app.use(morgan(':date[web] :method :url :status :response-time ms', {stream: log_stream})) //log to file
app.use(morgan(log_level)) //log to terminal

//Setting up express routes
const routes = require('./routes')(app, mongoose)

//Starting the server
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
})
