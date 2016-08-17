import React, { Component } from 'react'

export default class Greeting extends Component {
  constructor() {
    super()

    this.greetingUpdate = null

    this.state = this.getTime()
  }

  componentDidMount() {
    const updateTimeInMinutes = 5
    const updateInterval = 60000 * updateTimeInMinutes

    this.greetingUpdate = setInterval(() => {
      this.setState(this.getTime())
    }, updateInterval)
  }

  componentWillUnmount() {
    if (this.greetingUpdate) clearInterval(this.greetingUpdate)
  }

  getTime() {
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
        <p>Good {this.state.time}</p>
      </div>
    )
  }
}
