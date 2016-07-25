'use strict'
import React from 'react'

export default (currentSky) => {
  // Darksky icons (currentSky)
  // clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
  let path

  switch (currentSky) {
    case 'clear-day':
      path='images/sun-icon.png'
      break
    case 'clear-night':
      path='images/sun-icon.png'
      break
    case 'rain':
      path='images/sun-icon.png'
      break
    case 'snow':
      path='images/sun-icon.png'
      break
    case 'sleet':
      path='images/sun-icon.png'
      break
    case 'wind':
      path='images/sun-icon.png'
      break
    case 'fog':
      path='images/sun-icon.png'
      break
    case 'cloudy':
      path='images/sun-icon.png'
      break
    case 'partly-cloudy-day':
      path='images/sun-icon.png'
      break
    case 'partly-cloudy-night':
      path='images/sun-icon.png'
      break

    default: path = 'images/sun-icon.png'
  }

  return <img className="weather_current_icon" src={path} />
}
