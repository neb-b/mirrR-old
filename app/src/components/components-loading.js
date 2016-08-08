import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';

const LoadingComponents = () => {
  return (
    <View style={loaderStyles.imageContainer}>
      <Image style={loaderStyles.image} source={require('../img/loading.png')}>
        <View style={loaderStyles.content}>
          <Text style={loaderStyles.title}>react mirror</Text>
          <Spinner visible={true} />
        </View>
      </Image>
    </View>
  )
}

const loaderStyles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft: 70,
    marginTop: 240
  }
})

export default LoadingComponents
