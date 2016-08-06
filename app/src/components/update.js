import React, { Component } from 'react'
import { View, TouchableNativeFeedback, Switch, Text } from 'react-native'
import ComponentsList from './components-list'
console.log('list', ComponentsList)

export default class UpdateComponents extends Component {
  render() {
    return (
      <View>
        <ComponentsList />
      </View>
    )
  }
};
