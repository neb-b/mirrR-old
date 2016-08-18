import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import Button from 'react-native-button'

const IpStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    padding: 20,
    marginTop: 200,
    fontSize: 30
  }
})

class AddIpAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
     }
  }

  render() {
    return (
      <View style={IpStyles.container}>
        <Text style={IpStyles.text}>Enter your IP address</Text>
        <TextInput
          style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          style={{padding:10, marginTop: 20, height:45, fontSize: 20, color: 'white', backgroundColor: '#f4583d', borderRadius: 5}}
          onPress={() => this.props.save(this.state.text)} >
          Save
        </Button>
      </View>
    );
  }
}

export default AddIpAddress
