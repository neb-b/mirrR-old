import React, { Component } from 'react'
import io from 'socket.io-client'

let timerUpdate = null

export default class CountdownTimer extends Component {
  constructor() {
    super()

    this.getFormattedTime = this.getFormattedTime.bind(this)

    this.state = {
      currentTimerValue: null,
      initialTimerValue: null,
      slider: 1
    }

    const url = 'http://localhost:5000'
    const socket = io(url)

    socket.on('start-timer', (data) => {
      if (this.state.currentTimerValue) clearInterval(timerUpdate)

      this.setState({
        currentTimerValue: data.time,
        initialTimerValue: data.time
      })

      timerUpdate = setInterval(() => {
        this.setState({
          currentTimerValue: this.state.currentTimerValue - 1
        })

        // Once timer reaches zero, clearInterval
        if (!this.state.currentTimerValue) clearInterval(timerUpdate)
      }, 1000)
    })
  }

  // If current timer value, format seconds into mm:ss
  // If no curren timer, return null
  getFormattedTime(time) {
    const minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    if (seconds < 10) seconds = '0' + seconds
    if (!seconds) seconds = '00'

    return `${minutes}:${seconds}`
  }

  render() {
    if (!this.state.currentTimerValue) return null

    return (
      <div className="countdown_timer">
        <h2>{this.getFormattedTime(this.state.currentTimerValue)}</h2>
      </div>
    )
  }
}
