import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchWeather } from '../../redux/actions/weather'
import Loader from '../loader/loader'
import getWeatherIcon from './weather_icon'

class Weather extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const updateTimeInMinutes =  5
    const weatherUpdateInterval = 60000 * updateTimeInMinutes

    this.props.fetchWeather()
    setInterval(() => {this.props.fetchWeather()}, weatherUpdateInterval)
  }

_renderWeather({ data }) {
  return (
    <div>
     <div className="weather_current">
       <h1 className="weather_current_temp">{data.currently.apparentTemperature.toFixed(0)}°</h1>
       {getWeatherIcon(data.currently.icon)}
     </div>
     <p className="weather_summary">{data.daily.summary}</p>
   </div>
  )
}

  render() {
    const { weather } = this.props
    return (
      <div className="weather" id="weather">
        {
          Object.keys(weather).length
            ? this._renderWeather(weather)
            : <Loader component="weather" />
        }
      </div>
    )
  }
}

function mapStateToProps({ weather }) {
  return { weather }
}

export default connect(mapStateToProps, { fetchWeather })(Weather)
