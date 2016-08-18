import React, { Component } from 'react';
import {
  StyleSheet,
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
      ip: ''
    }
    // check for ip saved to local storage
  }

  saveIPAddress(ip) {
    console.log('saving')
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
    .then((res) => {
      console.log('res', res)
    })
    .catch((err) => console.error(err))
  }

  render() {
    console.log('render', this.state)

    if (!this.state.mirrorComponents.length && this.state.ip) {
      this.fetchMirrorComponents()
    }

    if (this.state.mirrorComponents.length && this.state.ip) this.sendUpdate()

    return (
      <View>
        <ToolbarAndroid
          style={styles.toolbar}>
          <View><Text style={styles.title}>React Native Mirror</Text></View>
        </ToolbarAndroid>
        {
          this.state.ip
          ? <MirrorComponents
              components={this.state.mirrorComponents}
              toggleComponent={this.toggleComponent.bind(this)}/>
            : <AddIpAddress save={this.saveIPAddress.bind(this)}/>
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
  }
})

export default App
