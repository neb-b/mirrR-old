import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchWeather } from '../../actions/action_weather'
import Loader from '../loader/loader'
import getWeatherIcon from './weather_icon'

class Weather extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(const { props: {  } } = this) {
    const updateTimeInMinutes =  5
    const weatherUpdateInterval = 60000 * updateTimeInMinutes

    if (props.location) {
      props.fetchWeather(coords)
    }
    setInterval(() => {this.props.fetchWeather(coords)}, weatherUpdateInterval)
  }

  render({ location, weather: {data} }) {
    if (!data) return <Loader component="weather" />
    if (!location) return (<View><Text>No weather location</Text></View>)

    return (
      <div className="weather" id="weather">
        <div className="weather_current">
          <h1 className="weather_current_temp">{weather.currently.apparentTemperature.toFixed(0)}°</h1>
          {getWeatherIcon(weather.currently.icon)}
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
