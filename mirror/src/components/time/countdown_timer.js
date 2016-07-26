import React, { Component } from 'react'
import io from 'socket.io-client'
import annyang from 'annyang'

let timerUpdate = null

export default class CountdownTimer extends Component {
  constructor() {
    super()

    this.getFormattedTime = this.getFormattedTime.bind(this)
    this.newTimer = this.newTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)

    this.state = {
      currentTimerValue: null,
      initialTimerValue: null
    }
  }

  // Needs more testing
  //
  componentDidMount() {
  //   if (annyang) {
  //     var commands = {
  //       'start timer': this.newTimer(2),
  //       'start a timer': this.newTimer(2),
  //       'new timer': this.newTimer(2),
  //       'timer': this.newTimer(2),
  //       'start timer for *length minutes': this.newTimer(length),
  //       // 'start timer for *length minutes and *seconds': this.newTimer(length, seconds),
  //       'stop timer': this.stopTimer()
  //     }
  //
  //     annyang.addCommands(commands)
  //     annyang.start({continuous: false})
  //   }

    const url = 'http://localhost:5000'
    var socket = io(url)

    socket.on('start-timer', (data) => {
      this.newTimer(data.minutes, data.seconds)
    })
  }



  newTimer(minutes, seconds) {
    if (this.state.currentTimerValue) this.stopTimer()

    let time
    if (minutes && seconds) time = minutes * 60 + Number(seconds)
    if (!seconds) time = minutes * 60
    if (!minutes) time = seconds

    this.setState({currentTimerValue: time})

    timerUpdate = setInterval(() => {
      this.setState({ currentTimerValue: this.state.currentTimerValue - 1 })
      if (!this.state.currentTimerValue) this.stopTimer()
    }, 1000)
  }

  stopTimer() {
    this.setState({
      currentTimerValue: null,
      initialTimerValue: null
    })

    if (timerUpdate) clearInterval(timerUpdate)
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
