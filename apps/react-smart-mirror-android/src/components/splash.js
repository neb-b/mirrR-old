import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    padding: 20,
    fontSize: 30
  },
  wifi: {

  }
})

const Splash = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Smart Mirror</Text>
      <Text style={styles.wifi}>Make sure you are connected to wifi</Text>
    </View>
  )
}

export default Splash
