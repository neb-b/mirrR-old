import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import App from './src/app'

class AndroidMirrorControl extends Component {
  render() {
    return (
      <View>
        <App />
      </View>
    );
  }
}


AppRegistry.registerComponent('AndroidMirrorControl', () => AndroidMirrorControl);
