import React, { Component } from 'react'
import annyang from 'annyang'

export default class Mic extends Component {
  componentDidMount() {
    if (annyang) {
      var commands = {
        'stop': function() {
          console.log('stop')
        },
        'play *song': function(song) {
         console.log('play ', song)
        }
      }

      annyang.addCommands(commands)
      annyang.start({continuous: false})
    }
  }

  render() {
    return (
      <h3>Mic</h3>
    )
  }
}
