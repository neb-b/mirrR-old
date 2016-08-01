import React, { Component } from 'react'
import { View, TouchableNativeFeedback, Text } from 'react-native'

export default class Update extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      test: null
    }
    this._updateComponents = this._updateComponents.bind(this)
  }
  _updateComponents() {
    const url = 'http://192.168.1.13:5000/components'
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        components: [
          'Google',
          'Greeting',
          'Time',
          'News'
        ]
      })
    })

    this.setState({
      test: 1
    })
  }
  render() {
    return (
      <TouchableNativeFeedback
          onPress={this._updateComponents}
          background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
          <Text style={{margin: 30}}>Button</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
};
