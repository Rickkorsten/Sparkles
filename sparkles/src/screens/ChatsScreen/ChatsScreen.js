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
    if (this.props.activeRelation != null) {
      this.getAllMessages();
    }
  }

  getAllMessages = (relation_id) => {
    const {_id} = this.props.activeRelation
    axios.get(`https://sparklesapi.azurewebsites.net/relation/relation/${_id}`)
      .then(result => {
        console.log(result)
        const messages = result.data.data.reverse();
        this.setState({ allMessages: messages });
      })
  }

  onSend(message) {
    const { _id } = this.props.activeRelation;

    // destruct message like active user
    // send relation id with message
    const newMessage = message[0]
    newMessage.relation_id = _id;
    console.log(newMessage)

    axios.post(`https://sparklesapi.azurewebsites.net/message`, newMessage)
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
    console.log(this.props.activeRelation)
    return (
      <View style={styles.container}>
        {
          this.props.activeRelation != null ?
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
              isAnimated={this.isAnimated}
            />
            :
            <Text>No active relation</Text>
        }

      </View>
    )
  }

  // end
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
  return {
    activeUser: state.activeUser,
    activeRelation: state.activeRelation
  }
};

export default connect(mapStateToProps, null)(ChatsScreen);

