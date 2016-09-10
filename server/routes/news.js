'use strict'

const express = require('express')
const router = express.Router()
const nytTop = require('nyt-top')
require('dotenv').config()

const API_KEY = process.env.NYT_API_KEY
nytTop.key(API_KEY)

router.get('/', function(req, res, next) {
  nytTop.section('home', function (err, data) {
    if (err) throw err
    res.send(data.results)
  })
})

module.exports = router
