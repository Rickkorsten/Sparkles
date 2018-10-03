import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { GiftedChat } from 'react-native-gifted-chat'

export default class ChatsScreen extends Component {
    constructor(props){
        super(props);
        state = {
            message: 'message',
            name: 'Rick Korsten'
        }
    }

    componentWillMount() {
    }

    onSend() {
        const message = {
          sender: this.state.name,
          message: this.state.message,
          relation_id: 1365,
          date_send: Date.now
          
        };
        console.log(message)
        axios.post(`https://sparkles-api-qxkx1f.turbo360-vertex.com/api/message`, message)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(err => {
        console.log(err.message);
      })
    }

  updateField(text,field){
    if (field == 'name'){
      console.log(text)
      this.setState({
        name : text
      })
    } else if (field == 'message'){
      this.setState({
        message : text
      })
    }
  }
    

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>

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
          onPress={()=>this.onSend()}
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
      alignItems:'center',
      justifyContent:'center'
    }
  });
