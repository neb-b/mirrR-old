import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import MirrorComponents from './components/mirror_components/mirror_components'

export default class App extends Component {
  render() {
    return (
      <View>
        <MirrorComponents />
      </View>
    );
  }
}
