import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Modal
} from 'react-native';
import Button from 'react-native-button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: 500,
    padding: 20
  },
  text: {
    fontSize: 20
  },
  input: {
    height: 60,
    marginTop: 20,
    fontSize: 20
  },
  button: {
    height:45,
    marginTop: 20,
    padding :10,
    fontSize: 16,
  },
  default: {
    color: 'white',
    backgroundColor: '#f4583d',
  },
  inverse: {
    color: '#f4583d',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f4583d'
  },
  error: {
    alignSelf: 'center',
    padding: 50
  }
})

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
     }
  }

  _renderWifiMsg(connection) {
    if (connection) {
      return <Text style={styles.error}>Make sure you are connected to Wifi</Text>
    }
    return null
  }

  _renderErrorMsg(error) {
    if (error) {
      return <Text style={styles.error}>There was a problem connection to the mirror</Text>
    }
    return null
  }


  _renderConnectionSetup(error, ip) {
    if (!error) {
      return (
        <View>
          <Text style={styles.text}>Enter your Raspberry Pi&#39;s IP address</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
          <Button
            style={[styles.button, styles.default]}
            onPress={() => this.props.saveIPAddress(this.state.text)} >
            Save
          </Button>
        </View>
      )
    } else {
      return _renderWifiMsg(this.props.connection)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.connection
          ? this._renderConnectionSetup(this.props.error, this.props.mirrorIp)
          : this._renderWifiMsg(this.props.connection)
        }
      </View>
    );
  }
}

export default Setup
