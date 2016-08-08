import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';

const loadingStyles = StyleSheet.create({
  textContainer: {
    alignSelf: 'center',
    marginTop: 250
  },
  text: {
    fontSize: 20
  }
})

const Loading = ({ text, color }) => {
  return (
    <View style={loadingStyles.textContainer}>
      <Text style={loadingStyles.text}>{text}</Text>
      <Spinner visible={true} color={color} />
    </View>
  )
}


export default Loading
// <Image style={loaderStyles.image} source={require('../img/loading.png')}>
//   <View style={loaderStyles.content}>
//     <Text style={loaderStyles.title}>react mirror</Text>
//     <Spinner visible={true} />
//   </View>
// </Image>
//
// const loaderStyles = StyleSheet.create({
//   imageContainer: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//   },
//   title: {
//     color: 'white',
//     fontSize: 50,
//     fontWeight: 'bold',
//     marginLeft: 70,
//     marginTop: 240
//   }
// })
