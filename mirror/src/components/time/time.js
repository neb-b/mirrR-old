import React, { Component } from 'react'
var timeUpdate = null

export default class Clock extends Component {
  constructor () {
    super()

    // Initialize state with current time
    this.state = this.getTime()
  }

  // After component mounts, call setInterval to update time every second
  componentDidMount() {
    timeUpdate = setInterval(() => {
      this.setState(this.getTime())
    }, 1000)
  }

  // If component unmounts, clearInterval
  componentWillUnmount() {
    if (timeUpdate) clearInterval(timeUpdate)
  }

  getTime() {
    return {
      time: moment().format('h:mm a'),
      date: moment().format('ddd MMMM Do')
    }
  }

  render () {
    return (
      <div className="time">
        <h1 className="clock">{this.state.time}</h1>
        <h3 className="date">{this.state.date}</h3>
      </div>
    )
  }
}
