import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput} from 'react-native';

export default class RegisterScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
       <TextInput
            placeholder={'First Name'}
            style={styles.input}
            onChangeText={(text) => this.updateField(text, 'message')}
          />
        <TextInput
            placeholder={'Lastname Name'}
            style={styles.input}
            onChangeText={(text) => this.updateField(text, 'message')}
          />
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