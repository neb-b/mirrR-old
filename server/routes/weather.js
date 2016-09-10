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
  getWeather(req.params, function(err, weather) {
    res.status(error ? 400 : 200).send(error|| weather);
  })
})

function getWeather(location, cb) {
  forecast.get(location.lat, location.lon, function (err, res, data) {
    if(err) cb(err)
    cb(null, data)
  })

}

module.exports = router
