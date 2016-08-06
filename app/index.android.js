import React, { Component } from 'react'
import {
  AppRegistry,
  ToolbarAndroid,
  StyleSheet,
  Text,
  View
} from 'react-native'
import UpdateComponents from './src/components/update'


class app extends Component {
  render() {
    return (
      <View>
        <ToolbarAndroid title="React Mirror" style={styles.toolbar}/>
        <UpdateComponents />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#a3a3a3',
    height: 60,
  },
})

AppRegistry.registerComponent('app', () => app);
