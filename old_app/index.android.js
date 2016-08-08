import React, { Component } from 'react'
import { AppRegistry, View, Text } from 'react-native'
// import App from './src/app'

class MirrorController extends Component {
  render() {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('MirrorController', () => MirrorController);
