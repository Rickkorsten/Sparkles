import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class HomeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
      <Text>HomeScreen</Text>
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