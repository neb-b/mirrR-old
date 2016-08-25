import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Switch
} from 'react-native'
import Loading from './loading'

const renderRow = (comp, toggleComponent) => {
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

const MirrorComponents = ({ components, toggleComponent }) => {
  if (!components) return <Loading text="Loading widgets" />

  return (
    <View>
    <ScrollView>
    {components.map((comp) => renderRow(comp, toggleComponent))}
    </ScrollView>
    </View>
  )
}

const mirrorCompStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
  },
  text: {
    padding: 10,
    fontSize: 18
  },
  switch: {
    padding: 10
  }
})


export default MirrorComponents
