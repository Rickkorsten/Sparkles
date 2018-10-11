import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import SocketIOClient from 'socket.io-client';
import axios from 'axios';

export default class ChatsScreen extends Component {

  constructor(props) {
    super(props);
    this.socket = SocketIOClient.connect('http://localhost:3000');
    this.socket.on('addMessage', this.getAllMessages)
  }

  state = {
    message: 'message',
    name: 'Rick Korsten',
    allMessages: [],
  }


  componentWillMount() {
    this.getAllMessages();
  }

  getAllMessages = () => {
    axios.get('http://localhost:3000/relation/relation/12345678')
      .then(result => {
        this.setState({ allMessages: result.data.data });
      })
  }

  onSend() {
    const message = {
      sender: this.state.name,
      message: this.state.message,
      relation_id: 12345678,
      date_send: Date.now

    };
    console.log(message)
    axios.post(`http://localhost:3000/message`, message)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err.message);
      })
  }

  updateField(text, field) {
    if (field == 'name') {
      console.log(text)
      this.setState({
        name: text
      })
    } else if (field == 'message') {
      this.setState({
        message: text
      })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          {
            this.state.allMessages.map(message => {
              return (
                <View className="message">
                  <Text>{message.sender}</Text>
                  <Text>{message.message}</Text>
                </View>
              )
            })
          }
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'name'}
            style={styles.input}
            onChangeText={(text) => this.updateField(text, 'name')}
          />
          <TextInput
            placeholder={'message'}
            style={styles.input}
            onChangeText={(text) => this.updateField(text, 'message')}
          />
          <TouchableOpacity
            onPress={() => this.onSend()}
          >
            <Text>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
