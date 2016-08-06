import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View
} from 'react-native'
import UpdateComponents from './src/components/update'


class app extends Component {
  render() {
    return (
      <View>
        <UpdateComponents />
      </View>
    );
  }
}

AppRegistry.registerComponent('app', () => app);
