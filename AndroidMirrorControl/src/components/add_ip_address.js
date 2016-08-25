import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
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
  save: {
    color: 'white',
    backgroundColor: '#f4583d',
  },
  inverse: {
    color: '#f4583d',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f4583d'
  }
})

class AddIPAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
     }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Enter your Raspberry Pi&#39;s IP address</Text>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
        </View>
        <Button
          style={[styles.button, styles.save]}
          onPress={() => this.props.save(this.state.text)} >
          Save
        </Button>
        <Button
          style={[styles.button, styles.inverse]}
          >
          How do I find the IP address?
        </Button>
      </View>
    );
  }
}

export default AddIPAddress
