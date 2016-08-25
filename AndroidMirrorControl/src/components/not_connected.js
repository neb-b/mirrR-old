import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import AddIPAddress from './add_ip_address'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 20,
    fontSize: 20
  }
})


const NotConnected = ({save, connection}) => {
  return (
    <View style={styles.container}>
    {
      connection
      ? <AddIPAddress save={save}/>
      : <Text style={styles.text}>Make sure you are connected to Wifi</Text>
    }
    </View>
  )
}

export default NotConnected
