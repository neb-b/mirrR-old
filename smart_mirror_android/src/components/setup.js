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
  modal: {
    height: 300,
    width: 500,
    backgroundColor: 'red'
  }
})

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      modalVisible: false
     }
  }

  renderModal() {
    return null
    // return (
      //  <Modal
      //    style={styles.modal}
      //    animationType={"slide"}
      //    transparent={false}
      //    visible={this.state.modalVisible}
      //    onRequestClose={() => {alert("Modal has been closed.")}}
      //    >
      //   <View style={{marginTop: 22}}>
      //      <Text>Hello World!</Text>
       //
      //      <Button
      //        style={[styles.button, styles.default]}
      //        onPress={() => this.setState({modalVisible: false})}>
      //        <Text>Got it</Text>
      //      </Button>
      //    </View>
      //  </Modal>
    //  )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Enter your Raspberry Pi&#39;s IP address</Text>
        {this.state.modalVisible && this.renderModal()}
        <View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
        </View>
        <Button
          style={[styles.button, styles.default]}
          onPress={() => this.props.saveIPAddress('mirrorIp', this.state.text)} >
          Save
        </Button>
        <Button
          style={[styles.button, styles.inverse]}
          onPress={() => this.setState({modalVisible: true})} >
          How do I find the IP address?
        </Button>
      </View>
    );
  }
}

export default Setup
