import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
  Switch
} from 'react-native'
import Loading from '../loading'
import availableMirrorComponents from './components'


class MirrorComponents extends Component {
  constructor(props) {
    super(props)

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      dataSource: ds.cloneWithRows(availableMirrorComponents),
    }

    this.toggleComponent = this.toggleComponent.bind(this)
  }

  toggleComponent(comp) {
    let currentComponents = this.props.current.slice()
    if (currentComponents.indexOf(comp) !== -1) {
      currentComponents.concat(comp)
    } else {
      currentComponents.filter((c) => c !== comp)
    }
    this.props.updateMirror(currentComponents)
  }

  renderRow(comp) {
    return (
      <TouchableHighlight
        key={comp}
        onClick={this.toggleComponent(comp)}>
        <View key={comp} style={mirrorCompStyles.row}>
          <Text style={mirrorCompStyles.text}>{comp}</Text>
          <Switch style={mirrorCompStyles.switch}
            onValueChange={this.toggleComponent(comp)}
            value={this.props.current.indexOf(comp) !== -1}/>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    // console.log('props', this.props)
    const components = this.props.components
    if (!components.length) return <Loading text="Loading items" />
    console.log('props', this.props)
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
      </View>
    )
  }
}

const mirrorCompStyles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
  },
  text: {
    fontSize: 18,
  },
  switch: {

  }
})


export default MirrorComponents
