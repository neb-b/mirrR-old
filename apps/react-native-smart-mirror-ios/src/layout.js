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
  TabBarIOS
} from 'react-native'
import MirrorComponents from './components/mirror_components'


class Layout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchMirrorComponents()
  }

  componentWillUpdate() {
    if (this.props.components && this.props.components.length) {
      this.props.sendUpdate()
    }
  }

  render() {
    return (
      <View>
        <TabBarIOS>
          style={styl>es.toolbar}>
          <View><Text style={styles.title}>Smart Mirror Control</Text></View>
        </TabBarIOS>
        <MirrorComponents>
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
