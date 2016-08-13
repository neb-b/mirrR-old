import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MirrorComponents from './components/mirror_components'

const URL = 'http://192.168.1.11:5000/components'

class App extends Component {
  constructor() {
    super()

    this.state = {
      mirrorComponents: []
    }
  }

  componentDidMount() {
    this.fetchMirrorComponents()
  }

  fetchMirrorComponents() {
    fetch(URL)
    .then((response) => {
        // for chrome bug
        setTimeout(() => null, 0)
        return response.json()
      })
      .then((compsFromServer) => {
        console.log('com', compsFromServer)
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
          console.log('toggled', component)
          const newC = Object.assign({}, component, {active: !component.active})
          console.log('newC', newC)
          return newC
        }
        return component
      })
    })
  }

  componentWillUpdate(state) {
    fetch(URL, {
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
    console.log('state', this.state)
    return (
      <View>
        <MirrorComponents
          components={this.state.mirrorComponents}
          toggleComponent={this.toggleComponent.bind(this)}/>
      </View>
    )
  }
}

export default App
