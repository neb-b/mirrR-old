import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Switch,
  ListView,
  TouchableHighlight
} from 'react-native'
import components from '../data/components'
import LoadingComponents from './components-loading'

export default class ComponentsList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      ds: components,
      dataSource: ds,
      // available: components,
      currentComponents: [],
      current: false
    }


    this.fetchComponents()
  }

  fetchComponents() {
    const url = 'http://192.168.1.12:5000/components'
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.components) {
          return this.setState({
            currentComponents: response.components,
            current: true
          })
        }
      })
      .catch((error) => {
        fetchCompnonents()
        // if (error) console.error('error', error)
      })
  }

  toggleComponent(toggledComponent) {
    const index = this.state.currentComponents.indexOf(toggledComponent)
    // console.log('index', index)
    if (index === -1) {
      this.setState({
        currentComponents: this.state.currentComponents.concat(toggledComponent)
      })
    } else {
      // console.log('not -1')
      this.setState({
        currentComponents: this.state.currentComponents.filter((component) => {

          if (component !== toggledComponent) {
            // console.log('no match return true')
          }
          return component !== toggledComponent
        })
      })
    }
  }

  sendUpdate() {
    const url = 'http://192.168.1.12:5000/components'
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        components: this.state.currentComponents
      })
    })
    .then((res) => res.json())
    .then((res) => console.log('Response', res))
    .catch((error) => console.error(error))
  }

  componentDidMount(){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.state.ds),
    })
  }

  renderRow(component){
    return (
      <TouchableHighlight
        onPress={()=> this.toggleComponent(component)}
        underlayColor = '#ddd'>
        <View style={styles.row}>
          <Text style={{fontSize:18}}>{component}</Text>
          <Switch
           onValueChange={(value) => this.toggleComponent(component)}
           value={this.state.currentComponents.indexOf(component) !== -1}
           style={styles.switch} />
        </View>
      </TouchableHighlight>
    )
  }


  render() {
    if (this.state.current === false) {
      return null
    }

    // Terrible place for sendUpdate()
    // Tired of trying to mess with it, I will be back
    this.sendUpdate()

    return (
      <View>
        <ListView
         dataSource = {this.state.dataSource}
         renderRow = {this.renderRow.bind(this)}>
       </ListView>
      </View>
    );
  }
}


var styles = StyleSheet.create({
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
