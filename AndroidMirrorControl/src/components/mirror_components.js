import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Switch,
  Dimensions
} from 'react-native'
import Loading from './loading'


const renderRow = (comp, toggleComponent) => {
  return (
    <View key={comp.name} style={styles.row}>
        <Text style={styles.text}>{comp.name}</Text>
        <Switch style={styles.switch}
        value={comp.active}
        onChange={() => toggleComponent(comp)}/>
    </View>
  )
}

const MirrorComponents = ({ components, toggleComponent }) => {
  if (!components) return <Loading text="widgets" />

  return (
    <View>
      <ScrollView style={styles.scrollview}>
        {components.map((comp) => renderRow(comp, toggleComponent))}
      </ScrollView>
    </View>
  )
}

// TEMP
// flex: 1 on container not scrolling
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollview: {
    height: height - 60
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
