'use strict'

const express = require('express')
const router = express.Router()
require('dotenv').config()

const Forecast = require('forecast.io')
const options = {
  APIKey: process.env.DARKSKY_API_KEY
}

const forecast = new Forecast(options)

router.get('/', function(req, res) {
  getWeather(req.body.location, function(err, weather) {
    res.send(weather)
  })
})

function getWeather(location, cb) {
  forecast.get(location.lat, location.lon, function (err, res, data) {
    if(err) console.log('err', err)
    cb(null, data)
  })

}

module.exports = router
