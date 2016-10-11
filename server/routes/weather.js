'use strict'

require('dotenv').config()
const express = require('express')
const router = express.Router()
const Forecast = require('forecast.io')
const publicIp = require('public-ip')
const freegeoip = require('node-freegeoip')

const options = {
  APIKey: process.env.DARKSKY_API_KEY
}
const forecast = new Forecast(options)

router.get('/', function(req, res) {
  getWeather(function (err, weather) {
    if (err) return res.send(err)
    res.send(weather)
  })
})

let location
function getLocation() {
  publicIp.v4().then((ip) => {
    freegeoip.getLocation(ip, function(err, payload) {
      location = {
        lat: payload.latitude,
        lon: payload.longitude
      }
    });
  })
}
getLocation()


function getWeather(cb) {
  if (location) {
    forecast.get(location.lat, location.lon, function (err, res, data) {
      if (err) return cb(err)
      cb(null, data)
    })
  } else {
    cb('NO LOCATION')
  }
}


module.exports = router
