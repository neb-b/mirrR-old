import React, { Component } from 'react'
import io from 'socket.io-client'
// import CountdownTimer from './countdown_timer'

let timeUpdate = null
let timerUpdate = null

export default class Clock extends Component {
  constructor() {
    super()

    // Initialize state with current time
    this.state = {
      time: moment().format('h:mm a'),
      date: moment().format('ddd MMMM Do')
    }
  }

  // After component mounts, call setInterval to update time every second
  componentDidMount() {
    let timer = false

    timeUpdate = setInterval(() => {
      this.setState(this.getTime(timer))
    }, 1000)
  }

  // If component unmounts, clearInterval
  componentWillUnmount() {
    if (timeUpdate) clearInterval(timeUpdate)
  }

  getTime(timer) {
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
