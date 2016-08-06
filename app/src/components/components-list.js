import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  Switch
} from 'react-native'
import components from '../data/components'

export default class ComponentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available: components,
      currentComponents: [],
      current: false
    }

    this.fetchComponents()
  }

  fetchComponents() {
    const url = 'http://192.168.1.13:5000/components'
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.components) {
          return this.setState({
            currentComponents: response.components,
            current: true
          })
        }
      })
      .catch((error) => {
        if (error) console.error('error', error)
      })
  }

  _toggleComponent(toggledComponent) {
    // console.log('toggled', toggledComponent)
    const index = this.state.currentComponents.indexOf(toggledComponent)
    // console.log('index', index)
    if (index === -1) {
      this.setState({
        currentComponents: this.state.currentComponents.concat(toggledComponent)
      })
    } else {
      // console.log('not -1')
      this.setState({
        currentComponents: this.state.currentComponents.filter((component) => {

          if (component !== toggledComponent) {
            // console.log('no match return true')
          }
          return component !== toggledComponent
        })
      })
    }
  }

  sendUpdate() {
    const url = 'http://192.168.1.13:5000/components'
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        components: this.state.currentComponents
      })
    })
    .then((res) => res.json())
    .then((res) => console.log('Response', res))
    .catch((error) => console.error(error))
  }

  renderSwitches(component) {
    return (
      <View key={component} className="components-list">
        <Text>{component}</Text>
        <Switch
          onValueChange={(value) => this._toggleComponent(component)}
          style={{marginBottom: 10}}
          value={this.state.currentComponents.indexOf(component) !== -1} />
      </View>
    )
  }

  render() {
    // Terrible place for sendUpdate()
    // Tired of trying to mess with it, I will be back
    this.sendUpdate()

    if (this.state.current === false) {
      return (
        <View>
          <Text>Loading components...</Text>
        </View>
      )
    }

    return (
      <View>
        {this.state.available.map(this.renderSwitches.bind(this))}
      </View>
    );
  }
}
