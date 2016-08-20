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
import AddIpAddress from './components/ip'


class App extends Component {
  constructor() {
    super()

    this.state = {
      mirrorComponents: [],
      ip: '',
      connection: null
    }

    this.readIPAddress()
    this.handleNetworkChange = this.handleNetworkChange.bind(this)
  }

  componentDidMount() {
    NetInfo.fetch().done(this.handleNetworkChange)
    NetInfo.addEventListener(
      'change',
      this.handleNetworkChange
    )

  }

  handleNetworkChange(reach) {
    if (reach === 'WIFI') {
      this.setState({connection: true})
    } else {
      this.setState({connection: false})
    }
  }

  readIPAddress() {
    try {
      AsyncStorage.getItem('mirrorIp')
        .then((ip) => this.setState({ip}))
    } catch(err) {
      console.log('err', err)
    }
  }

  saveIPAddress(ip) {
    AsyncStorage.setItem("mirrorIp", ip);
    this.setState({ ip })
  }

  fetchMirrorComponents() {
    fetch(`http://${this.state.ip}:5000/components`)
    .then((response) => {
        // for chrome bug
        setTimeout(() => null, 0)
        return response.json()
      })
      .then((compsFromServer) => {
        this.setState({
          mirrorComponents: compsFromServer
        })
      })
      .catch((error) => console.error(error))
  }

  toggleComponent(toggledComp) {
    this.setState({
      mirrorComponents: this.state.mirrorComponents.map((component) => {
        if (component.name === toggledComp.name) {
          const newC = Object.assign({}, component, {active: !component.active})
          return newC
        }
        return component
      })
    })
  }

  sendUpdate() {
    fetch(`http://${this.state.ip}:5000/components`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        components: this.state.mirrorComponents
      })
    })
    .then((res) => res.json())
    .catch((err) => console.error(err))
  }

  render() {

    if (!this.state.mirrorComponents.length && this.state.ip && this.state.connection) {
      this.fetchMirrorComponents()
    }

    if (this.state.mirrorComponents.length && this.state.ip && this.state.connection) {
      this.sendUpdate()
    }


    return (
      <View>
        <ToolbarAndroid
          style={styles.toolbar}>
          <View><Text style={styles.title}>React Native Mirror</Text></View>
        </ToolbarAndroid>
        {
          this.state.ip && this.state.connection
          ? <MirrorComponents
              components={this.state.mirrorComponents}
              toggleComponent={this.toggleComponent.bind(this)}/>
          : <AddIpAddress save={this.saveIPAddress.bind(this)} connection={this.state.connection}/>
        }
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

export default App
