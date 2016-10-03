import React, { Component } from 'react';
import {
  NetInfo,
  AsyncStorage,
  View,
} from 'react-native'
import Loading from './components/loading'
import Splash from './components/splash'
import Setup from './components/setup'
import Layout from './layout'

class App extends Component {
  constructor() {
    super()

    this.state = {
      error: false,
      connection: false,
      ready: false,
      connectionType: null,
      location: null,
      mirrorIp: null,
      mirrorComponents: null,
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
          console.log("ip", ip)
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
          const coords = JSON.parse(location)
          if (coords) {
            this.setState({location: coords})
            return location
          } else {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                let location = {
                  lat: position.coords.latitude,
                  lon: position.coords.longitude
                }
                this.setState({location: location})
                AsyncStorage.setItem('location', JSON.stringify(location))
                return location
              }, (err) => console.error("err", err));
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
    if (toggledComp.name === 'Weather') {
      const weather = toggledComp

      if (!weather.location.lat && !weather.location.lon) {
        weather.location = this.state.location
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
        // for chrome bug
        setTimeout(() => null, 0)
        return response.json()
      })
      .then((compsFromServer) => {
        this.setState({
          mirrorComponents: compsFromServer
        })
      })
      .catch((error) => {
        console.error("error", error)
        this.setState({error: true})
      })
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

  ready() {
    this.setState({ready: true})
  }

  render() {
    console.log("render", this.state)

    return (
      <View>
        {
          this.state.ready
          ? <Layout
              components={this.state.mirrorComponents}
              fetchMirrorComponents={this.fetchMirrorComponents.bind(this)}
              sendUpdate={this.sendUpdate.bind(this)}
              toggleComponent={this.toggleComponent.bind(this)} />
          : <Setup
              error={this.state.error}
              connection={this.state.connectionType === 'WIFI'}
              saveIPAddress={this.saveIPAddress.bind(this)}
              ready={this.ready.bind(this)}
              ip={this.state.mirrorIp}
            />
        }
      </View>
    )
  }
}


export default App
