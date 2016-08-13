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

const MirrorComponents = ({ components, toggleComponent }) => {
  if (!components.length) return <Loading text="Loading widgets" />
  return (
    <View>
      <ScrollView>
        {components.map((comp) => renderRow(comp, toggleComponent))}
      </ScrollView>
    </View>
  )
}

const renderRow = (comp, toggleComponent) => {
  // console.log('comp', comp);
  // console.log('props', props)
  // console.log('togg', toggleComponent);
  return (
    <View
      key={comp.name}
      style={mirrorCompStyles.row}>
      <Text style={mirrorCompStyles.text}>{comp.name}</Text>
      <Switch style={mirrorCompStyles.switch}
        value={comp.active}
        onChange={() => toggleComponent(comp)}/>
    </View>
  )
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
