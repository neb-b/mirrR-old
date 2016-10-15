import React, { Component } from 'react'

export default class Clock extends Component {
  constructor() {
    super()

    this.timeUpdate = null

    this.state = {
      time: moment().format('h:mm a'),
      date: moment().format('ddd MMMM Do')
    }
  }

  componentDidMount() {
    this.timeUpdate = setInterval(this.updateTime.bind(this), 1000)
  }

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
