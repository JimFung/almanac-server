const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const fs = require('fs')
const cors = require('cors')

//Setting up DB settings
mongoose.Promise = global.Promise
mongoose.connect(process.env.ALMANAC_DB)
const db = mongoose.connection

db.on('error', (err) =>{
  console.log(err)
})

db.once('open', () => {
  console.log('Connected to mongodb')
})

const log_fmt = ':date[web] :method :url :status :response-time ms'
//Setting up logging
let log_stream = fs.createWriteStream(`${new Date().toDateString()}.log`, {flags: 'a'})
app.use(morgan(log_fmt, {stream: log_stream})) //log to file
app.use(morgan(log_fmt)) //log to termina

//Setting up cors
app.use(cors())

//Setting up express routes
require('./routes')(app, mongoose)

//Starting the server
app.listen(process.env.PORT || 15322, () => {
  console.log(`Server running at ${process.env.PORT}`)
})
