import React, { Component } from 'react'
import { View, TouchableNativeFeedback, Switch, Text } from 'react-native'

export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available: [
        'Greeting',
        'Google',
        'Time',
        'Weather',
        'Twitter',
        'News'
      ],
      components: [],
      current: false
    }

    this.fetchComponents()
  }

  fetchComponents() {
    console.log('fetch')
    const url = 'http://192.168.1.11:5000/components'
    return fetch(url, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.components) {
          return this.setState({
            components: res.components,
            current: true
          })
        }
      })
      .catch((error) => {
        console.error('error', error)
      })
  }

  _toggleComponent(toggledComponent) {
    const index = this.state.components.indexOf(toggledComponent)
    if (index === -1) {
      this.setState({
        components: this.state.components.concat(toggledComponent)
      })
    } else {
      this.setState({
        components: this.state.components.filter((component) => {
          return component !== toggledComponent
        })
      })
    }

    this.sendUpdate()
  }

  sendUpdate() {
    const url = 'http://192.168.1.11:5000/components'
    console.log('sending update')
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        components: this.state.components
      })
    })
    .then((res) => console.log('Response', res))
    .catch((error) => console.error(error))
  }

  renderSwitches(component) {
    return (
      <View key={component}>
        <Text>{component}</Text>
        <Switch
          onValueChange={(value) => this._toggleComponent(component)}
          style={{marginBottom: 10}}
          value={this.state.components.indexOf(component) !== -1} />
      </View>
    )
  }

  render() {
    console.log('render', this.state.components)
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
};
