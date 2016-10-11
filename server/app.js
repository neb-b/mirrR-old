'use strict'

const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
server.listen(process.env.PORT || 5000)

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(function(req, res, next) {
  req.io = io
  next()
})

app.enable('trust proxy')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/components', require('./routes/components'))
app.use('/weather', require('./routes/weather'))
app.use('/news', require('./routes/news'))
app.use('/twitter', require('./routes/twitter'))
app.use('/google', require('./routes/google_trends'))
app.use('/reddit', require('./routes/reddit'))

app.get('/favicon.ico', function(req, res) {
    res.send(200)
})

io.on('connection', function (socket) {
  console.log('socket connected')
})
