import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchWeather } from '../../actions/action_weather'
import Loader from '../loader/loader'
import getWeatherIcon from './weather_icon'

class Weather extends Component {
  constructor(props) {
    super(props)

    // How often to fetch for weather (in minutes)
    let weatherUpdateInterval = 5
    // Convert to milliseconds
    weatherUpdateInterval *= 60000

    // Keeping fetchWeather setInterval inside of componentWillMount because of geo callback
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.props.fetchWeather(coords)
      setInterval(() => {this.props.fetchWeather(coords)}, weatherUpdateInterval)
    })
  }

  render() {
    // If weather data, return weather information, else return "Getting weather..."
    const weather = this.props.weather.data
    if (!weather) return <Loader component="weather" />

    return (
      <div className="weather" id="weather">
        <div className="weather_current">
          <h1 className="weather_current_temp">{weather.currently.apparentTemperature.toFixed(0)}°</h1>
          {getWeatherIcon(weather.minutely.icon)}
        </div>
        <p className="weather_summary">{weather.hourly.summary}</p>
      </div>
    )
  }
}

function mapStateToProps({ weather }) {
  return { weather }
}

export default connect(mapStateToProps, { fetchWeather })(Weather)
