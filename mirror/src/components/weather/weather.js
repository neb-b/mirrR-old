import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchWeather } from '../../actions/action_weather'
import Loader from '../loader/loader'
import getWeatherIcon from './weather_icon'

class Weather extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const updateTimeInMinutes =  5
    const weatherUpdateInterval = 60000 * updateTimeInMinutes
    const coords = this.props.location
    if (coords) {
      this.props.fetchWeather(coords)
      setInterval(() => {this.props.fetchWeather(coords)}, weatherUpdateInterval)
    }
  }

  render() {
    const { weather: { data }, location } = this.props

    if (!data) return <Loader component="weather" />
    if (!location) return (<View><Text>No weather location</Text></View>)

    return (
      <div className="weather" id="weather">
        <div className="weather_current">
          <h1 className="weather_current_temp">{data.currently.apparentTemperature.toFixed(0)}°</h1>
          {getWeatherIcon(data.currently.icon)}
        </div>
        <p className="weather_summary">{data.hourly.summary}</p>
      </div>
    )
  }
}

function mapStateToProps({ weather }) {
  return { weather }
}

export default connect(mapStateToProps, { fetchWeather })(Weather)
