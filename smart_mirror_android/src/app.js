import React, { Component } from 'react';
import {
  NetInfo,
  AsyncStorage,
  View,
  ToolbarAndroid,
} from 'react-native'
import Loading from './components/loading'
import Splash from './components/splash'
import Setup from './components/setup'
import Layout from './layout'

class App extends Component {
  constructor() {
    super()

    this.state = {
      mirrorIp: null,
      connection: null,
      connectionType: null,
      location: null,
      mirrorComponents: []
    }

    this.handleNetworkChange = this.handleNetworkChange.bind(this)
  }

  componentDidMount() {
    this.readIPAddress()
    this.readLocation()

    NetInfo.fetch()
      .done(this.handleNetworkChange)
    NetInfo.addEventListener(
      'change',
      this.handleNetworkChange
    )
  }

  handleNetworkChange(reach) {
    if (reach === 'WIFI') {
      if (this.state.connectionType !== 'WIFI') {
        this.setState({connection: true, connectionType: 'WIFI'})
      }
    } else {
      if (this.state.connection) {
        this.setState({connection: false, connectionType: null})
      }
    }
  }

  readIPAddress() {
    try {
      AsyncStorage.getItem('mirrorIp')
        .then((ip) => {
          if (ip) {
            this.setState({mirrorIp: ip})
          }
        })
    } catch (err) {
      console.error('err', err)
    }
  }

  readLocation() {
    try {
      AsyncStorage.getItem('location')
        .then((location) => {
          console.log("loction", location)
          if (location) {
            this.setState({location})
            return location
          } else {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log("position", position)
                let location = {
                  lat: position.coords.latitude,
                  lon: position.coords.longitude
                }
                this.setState({location: location})
                AsyncStorage.setItem('location', JSON.stringify(location))
                return location
              }, (err) => console.log("err", err));
          }
        })
    } catch (err) {
      console.error('err', err)
    }
  }

  saveIPAddress(ip) {
    AsyncStorage.setItem('mirrorIp', ip)
    this.setState({mirrorIp: ip})
  }

  toggleComponent(toggledComp) {
    if (toggledComp.name = 'Weather') {
      const weather = toggledComp
      if (!weather.location) {
        toggledComp.location = this.state.location || this.readLocation()
      }
    }
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
    fetch(`http://${this.state.mirrorIp}:5000/components`)
    .then((response) => {
      console.log("response", response)
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
    fetch(`http://${this.state.mirrorIp}:5000/components`, {
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
    console.log("render", this.state)
    if (!this.state.connection) return <Splash />

    return (
      <View>
        {
          this.state.mirrorIp
          ? <Layout
              components={this.state.mirrorComponents}
              fetchMirrorComponents={this.fetchMirrorComponents.bind(this)}
              sendUpdate={this.sendUpdate.bind(this)}
              toggleComponent={this.toggleComponent.bind(this)} />
            : <Setup
                saveIPAddress={this.saveIPAddress.bind(this)}
              />
        }
      </View>
    )
  }
}


export default App
