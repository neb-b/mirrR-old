import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Switch
} from 'react-native'
import Loading from '../loading'
import availableMirrorComponents from './components'


class MirrorComponents extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }

    this.renderRow = this.renderRow.bind(this)
  }

  renderRow(comp) {
    return (
      <TouchableHighlight
        key={comp}
        onClick={this.props.toggleComponent(comp)}>
        <View key={comp} style={mirrorCompStyles.row}>
          <Text style={mirrorCompStyles.text}>{comp}</Text>
          <Switch style={mirrorCompStyles.switch}
            onValueChange={this.props.toggleComponent(comp)}
            value={this.props.current.indexOf(comp) !== -1}/>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    // console.log('props', this.props)
    const components = this.props.current
    if (!components.length) return <Loading text="Loading items" />

    return (
      <View>
        <ScrollView>
          {availableMirrorComponents.map(this.renderRow)}
        </ScrollView>
      </View>
    )
  }
}

const mirrorCompStyles = StyleSheet.create({
  row: {
    flex:1,
    // justifyContent: 'space-between',
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
