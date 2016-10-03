import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import App from './src/app'

class react_native_smart_mirror_ios extends Component {
  render() {
    return (
      <View>
        <App />
      </View>
    );
  }
}

AppRegistry.registerComponent('react_native_smart_mirror_ios', () => react_native_smart_mirror_ios);
