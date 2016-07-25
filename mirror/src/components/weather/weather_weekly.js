import React from 'react'

export default (props) => {
  return (
    <ul className="weather-week">
      {
        props.weather
          .slice(1,6) // Get next 5 days
          .map(renderWeekView)
      }
    </ul>
  )
}

function renderWeekView(day) {
  return (
    <li key={day.time} className="weather-day">
      {moment.unix(day.time).format('ddd')}
      <p>
        {day.apparentTemperatureMax.toFixed(0)}/
        {day.apparentTemperatureMin.toFixed(0)}
      </p>
    </li>
  )
}
