import React, { Component } from 'react';
import {
  NetInfo,
  AsyncStorage,
  View,
  ToolbarAndroid,
} from 'react-native'
import NotConnected from './components/not_connected'
import Layout from './layout'


class App extends Component {
  constructor() {
    super()

    this.state = {
      IP: '',
      connection: null,
      mirrorComponents: []
    }

    this.handleNetworkChange = this.handleNetworkChange.bind(this)
  }

  componentDidMount() {
    this.readIPAddress()

    NetInfo.fetch().done(this.handleNetworkChange)
    NetInfo.addEventListener(
      'change',
      this.handleNetworkChange
    )
  }

  readIPAddress() {
    try {
      AsyncStorage.getItem('mirrorIp')
      .then((IP) => this.setState({IP}))
    } catch(err) {
      console.error('err', err)
    }
  }

  handleNetworkChange(reach) {
    if (reach === 'WIFI') {
      this.setState({connection: true})
    } else {
      this.setState({connection: false})
    }
  }

  saveIPAddress(IP) {
    AsyncStorage.setItem("mirrorIp", IP)
    this.setState({ IP })
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

  fetchMirrorComponents() {
    fetch(`http://${this.state.IP}:5000/components`)
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

  sendUpdate() {
    fetch(`http://${this.state.IP}:5000/components`, {
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
    const showView = this.state.connection && this.state.IP
    return (
      <View>
        {
          showView
          ? <Layout
              components={this.state.mirrorComponents}
              fetchMirrorComponents={this.fetchMirrorComponents.bind(this)}
              sendUpdate={this.sendUpdate.bind(this)}
              toggleComponent={this.toggleComponent.bind(this)} />
          : <NotConnected
              connection={this.state.connection}
              save={this.saveIPAddress.bind(this)}/>
        }
      </View>
    )
  }
}


export default App
