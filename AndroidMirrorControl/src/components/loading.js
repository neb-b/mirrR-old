import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  text: {
    padding: 20,
    marginTop: 250,
    fontSize: 30
  }
})

const Loading = ({ text }) => {
  return (
    <View style={loadingStyles.container}>
      <Text style={loadingStyles.text}>{text}</Text>
      <ActivityIndicator
        animating={true}
        size="large"
        color="#f4583d" />
    </View>
  )
}

export default Loading
