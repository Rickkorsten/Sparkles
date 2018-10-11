import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import axios from 'axios';

class ChatsScreen extends Component {

  constructor(props) {
    super(props);
    this.socket = SocketIOClient.connect('http://localhost:3000');
    this.socket.on('addMessage', this.getAllMessages)
  }

  state = {
    message: 'message',
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
    const { firstName } = this.props.activeUser;

    const message = {
      sender: firstName,
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

  updateField(text) {
      this.setState({
        message: text
      })
  }


  render() {
    const { firstName } = this.props.activeUser;
    console.log(firstName);
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          {
            this.state.allMessages.map(message => {
              return (
                <View style={styles.message} key={message._id}>
                  <Text>{message.sender}</Text>
                  <Text>{message.message}</Text>
                </View>
              )
            })
          }
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'message'}
            style={styles.input}
            onChangeText={(text) => this.updateField(text)}
          />
          <TouchableOpacity
            style={styles.sendButton}
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
    justifyContent: 'center'
  },
  messageContainer: {
    flex: 9,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: 'grey',
  },
  sendButton: {
    backgroundColor: 'grey',
  },
  message: {
    display: 'flex',
    flexDirection: 'row',
  }
});


const mapStateToProps = state => {
  return { activeUser: state.activeUser }
};

export default connect(mapStateToProps)(ChatsScreen);
