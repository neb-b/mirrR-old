import React, { Component } from 'react';
import {
  NetInfo,
  AsyncStorage,
  StyleSheet,
  DrawerLayoutAndroid,
  Navigator,
  Menu,
  Text,
  View,
  ToolbarAndroid,
} from 'react-native'
import MirrorComponents from './components/mirror_components'
import NotConnected from './components/not_connected'


class Layout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchMirrorComponents()
  }

  componentWillUpdate() {
    if (this.props.components.length) {
      this.props.sendUpdate()
    }
  }

  render() {
    return (
      <View>
        <ToolbarAndroid
          style={styles.toolbar}>
          <View><Text style={styles.title}>React Native Mirror</Text></View>
        </ToolbarAndroid>
        <MirrorComponents
          components={this.props.components}
          toggleComponent={this.props.toggleComponent}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20
  },
  toolbar: {
    height: 60,
    backgroundColor: '#f4583d',
  },

})

export default Layout
