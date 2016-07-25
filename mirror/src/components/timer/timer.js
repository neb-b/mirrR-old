import React, { Component } from 'react'
import io from 'socket.io-client'
import CountdownTimer from './countdown_timer'

let timerUpdate = null

class Timer extends Component {
  constructor() {
    super()

    this.state = { time: null }

    const url = 'http://localhost:5000'
    var socket = io(url)

    socket.on('start-timer', (data) => {
      this.setState({
        time: data.time,
        timeLeft: data.time
      })

      // If timer already going, clearInterval and start new timer
      if (timerUpdate) clearInterval(timerUpdate)
      this.updateTime()
    })
  }

  updateTime() {
    timerUpdate = setInterval(() => {
      this.setState({time: this.state.time - 1})
      if (this.state.time === 0) clearInterval(timerUpdate)
    }, 1000)
  }

  render() {
    const time = this.state.time
    if (!time) return null

    return (
      <div className="timer">
        <CountdownTimer time={time} startTime={this.state.timeLeft} />
      </div>
    )
  }
}

export default Timer
