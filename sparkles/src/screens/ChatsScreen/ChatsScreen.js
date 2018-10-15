import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-ionicons'
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import axios from 'axios';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';


class ChatsScreen extends Component {

  constructor(props) {
    super(props);
    this.socket = SocketIOClient.connect('https://sparklesapi.azurewebsites.net');
    this.socket.on('addMessage', this.getAllMessages)

    this.inverted = true;
    this.renderAvatar = null;
    this.isAnimated = true;
  }

  state = {
    message: 'message',
    allMessages: [],
  }


  componentWillMount() {
    this.getAllMessages();
    console.log(this.props._id);
  }

  getAllMessages = () => {
    axios.get('https://sparklesapi.azurewebsites.net/relation/relation/12345678')
      .then(result => {
        this.setState({ allMessages: result.data.data.reverse() });
        console.log({ allMessages: result.data.data.reverse() });
      })
  }

  onSend(message) {
    const { firstName } = this.props.activeUser;
    // destruct message like active user
    // send relation id with message
    console.log(message[0])
    axios.post(`https://sparklesapi.azurewebsites.net/message`, message[0])
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

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#f19894',
          }
        }}
      />
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.allMessages}
        onSend={message => this.onSend(message)}
        user={{
          _id: this.props.activeUser._id,
          name: this.props.activeUser.firstName
        }}
        renderBubble={this.renderBubble}
        inverted={this.inverted}
        renderAvatar={this.renderAvatar}
        isAnimated = {this.isAnimated}
      />

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
    alignItems: 'center'
  },
  messageBar: {
    height: 40,
    width: '90%',
    borderRadius: 17,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    color: 'white'
  },
  sendButton: {

  },
  message: {
    display: 'flex',
    flexDirection: 'row',
  }
});


const mapStateToProps = state => {
  return { activeUser: state.activeUser }
};

export default connect(mapStateToProps,null)(ChatsScreen);
