import React, { Component } from 'react'
var greetingUpdate = null

export default class Greeting extends Component {
  constructor() {
    super()
    this.state = this.trackTime()
  }

  // After component mounts, call setInterval
  componentDidMount() {
    const updateInterval = 60000

    greetingUpdate = setInterval(() => {
      this.setState(this.trackTime())
    }, updateInterval)
  }

  // If component unmounts clear setInterval
  componentWillUnmount() {
    if (greetingUpdate) clearInterval(greetingUpdate)
  }

  trackTime() {
    const time = moment().format('hh a').split(' ')
    const numTime = Number(time[0])

    if (time[1] === 'am') {
      if (numTime > 5) return {time: 'morning'}
      return {time: 'night'}
    } else {
      if (numTime < 5 || numTime === 12) return {time: 'afternoon'}
      return {time: 'evening'}
    }
  }

  render() {
    return (
      <div className="greeting">
        <p>Good {this.state.time}.</p>
      </div>
    )
  }
}
