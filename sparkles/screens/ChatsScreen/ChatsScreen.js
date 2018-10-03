import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import { GiftedChat } from 'react-native-gifted-chat'

export default class ChatsScreen extends Component {
    constructor(props){
        super(props);
        state = {
            messages: [],
        }
    }

    componentWillMount() {
        this.setState({
          messages: [],
        })
      }

    onSend(messages = []) {
      axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
    

  render() {
    return (
        <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
      justifyContent:'center'
    }
  });
