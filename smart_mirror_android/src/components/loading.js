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
    justifyContent: 'center',
    alignItems: 'center',
    height: 500
  },
  text: {
    padding: 20,
    fontSize: 30
  }
})

const Loading = ({ text }) => {
  return (
    <View style={loadingStyles.container}>
      <Text style={loadingStyles.text}>Loading {text}...</Text>
      <ActivityIndicator
        animating={true}
        size="large"
        color="#f4583d" />
    </View>
  )
}

export default Loading
