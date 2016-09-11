'use strict'

const express = require('express')
const router = express.Router()
require('dotenv').config()

const Forecast = require('forecast.io')
const options = {
  APIKey: process.env.DARKSKY_API_KEY
}

const forecast = new Forecast(options)

router.get('/:lat/:lon', function(req, res) {
  getWeather(req.params, function(error, weather) {
    res.status(error ? 400 : 200).send(error|| weather);
  })
})

function getWeather(location, cb) {
  forecast.get(location.lat, location.lon, function (error, res, data) {
    if(error) cb(error)
    cb(null, data)
  })

}

module.exports = router
