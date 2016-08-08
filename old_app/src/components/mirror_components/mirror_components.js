import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Switch,
  ListView,
  TouchableHighlight
} from 'react-native'
import listOfComponents from './list_of_components'
import Loading from '../loading'

const styles = StyleSheet.create({
  row: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
  },
  selectionText: {
    fontSize: 15,
    paddingTop: 3,
    color: '#b5b5b5',
    textAlign: 'right'
  },
  switchContainer: {
    alignSelf: 'flex-end'
  }
});

export default class MirrorComponents extends Component {
  constructor() {
    super()

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      apiUrl: 'http://192.168.1.13:5000',
      components: listOfComponents,
      dataSource: ds.cloneWithRows(listOfComponents),
      current: false
    }
    this.checkToggled = this.checkToggled.bind(this)
    this.toggleComponent = this.toggleComponent.bind(this)
    // this.fetchComponents()
  }

  fetchComponents() {
    const url = `${this.state.apiUrl}/components`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('this', this.state)
        if (response.components) {
          const components = this.state.components.map((comp) => {
            if (response.components.indexOf(comp.name) !== -1) {
              return Object.assign(comp, {toggled: true})
            }
            return comp
          })
          return this.setState({
            dataSource: this.state.dataSource.cloneWithRows(components),
            components,
            current: true
          })
        }
      })
      .catch((error) => {
        if (error) console.error('error', error)
      })
  }

  sendUpdate() {
    const url = `${this.state.apiUrl}/components`
    const components = this.state.components
      .filter((comp) => comp.toggled)
      .map((comp) => comp.name)

    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ components })
    })
    .catch((error) => {
      this.sendUpdate()
      console.error(error)
    })
  }

  toggleComponent(toggledComponent) {
    // console.log('togg', toggledComponent)
    let components = this.state.components.slice()
    components.map((comp) => {
      if (toggledComponent.name === comp.name) {
        return Object.assign(comp, {toggled: !comp.toggled})
      }
      return comp
    })
    this.setState({
      // dataSource: this.state.dataSource.cloneWithRows(components),
      components
    })
  }

  renderRow(component) {
    return (
      <TouchableHighlight
        onPress={()=> this.toggleComponent(component)}
        underlayColor = '#ddd'>
        <View style={styles.row}>
          <Text style={{fontSize:18}}>{component.name}</Text>
          <Switch
           onValueChange={(value) => this.toggleComponent(component)}
           value={this.checkToggled(component.name)}
           style={styles.switch} />
        </View>
      </TouchableHighlight>
    )
  }

  checkToggled(componentName) {
    console.log('checktoggle')
    let shouldToggle
    this.state.components.forEach((comp) => {
      if (componentName === comp.name) {
        // console.log('cheking toggle again', comp)
        if (comp.toggled) shouldToggle = true
      }
    })
    // console.log('shouldToggle', shouldToggle)
    return shouldToggle
  }

  render() {
    console.log('render')
    console.log('state', this.state)
    // const dataSource = this.state.dataSource.cloneWithRows(this.state.components);

    // if (this.state.current === false) {
      return <Loading color="#f4583d" text="Grabbing components"/>
    // }

    // Update server with new components
    this.sendUpdate()

    return (
      <View>
        <ListView
         dataSource={dataSource}
         renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}
