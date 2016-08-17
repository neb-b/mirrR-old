import React, { Component } from 'react'

export default class Clock extends Component {
  constructor() {
    super()

    this.timeUpdate = null

    // Initialize state with current time
    this.state = {
      time: moment().format('h:mm a'),
      date: moment().format('ddd MMMM Do')
    }
  }

  // After component mounts, call setInterval to update time every second
  componentDidMount() {
    this.timeUpdate = setInterval(this.updateTime.bind(this), 1000)
  }

  // If component unmounts, clearInterval
  componentWillUnmount() {
    if (this.timeUpdate) clearInterval(this.timeUpdate)
  }

  updateTime() {
    this.setState({
      time: moment().format('h:mm a'),
      date: moment().format('ddd MMMM Do')
    })
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
