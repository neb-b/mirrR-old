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
        'Twitter',
        'News'
      ],
      components: []
    }
  }

  _toggleComponent(componentName) {
    if (this.state.components.indexOf(componentName) !== -1) {
      this.setState({
        components: this.state.components.filter((component) => component !== componentName)
      })
    } else {
      this.setState({
        components: this.state.components.concat(componentName)
      })
    }
    this.sendUpdate()
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
        components: this.state.components
      })
    })
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
    return (
      <View>
        {this.state.available.map(this.renderSwitches.bind(this))}
      </View>
    );
  }
};
