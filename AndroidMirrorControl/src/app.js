import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MirrorComponents from './components/mirror_components'

const URL = 'http://192.168.1.14:5000/components'

class App extends Component {
  constructor() {
    super()

    this.state = {
      currentMirrorComponents: []
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
      .then((response) => {
        this.setState({
          currentMirrorComponents: response.components
        })
      })
      .catch((error) => console.log(error))
  }

  updateMirrorComponents(components) {
    console.log('componnets', components)
    // fetch(URL, {
    //   method: 'PUT',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(components)
    // })
    //   .catch((error) => console.log(error))
  }

  render() {
    return (
      <View>
        <MirrorComponents
          current={this.state.currentMirrorComponents}
          toggleComponent={this.updateMirrorComponents}/>
      </View>
    )
  }
}

export default App
