import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Picker } from 'react-native';

export default class UserScreen extends Component {

  constructor(props){
    super(props);
    state = {
    }
  }

  componentWillMount() {
    this.setState({language: "js"})
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>Kies een gebruiker</Text>
      <Picker
        selectedValue={this.state.language}
        style={{ height: 150, width: "80%" }}
        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
        <Picker.Item label="Amber" value="java" />
        <Picker.Item label="Charlotte" value="js" />
        <Picker.Item label="Isabelle" value="test" />
        <Picker.Item label="Rick" value="test1" />
        <Picker.Item label="Tom" value="test2" />
        <Picker.Item label="Sander" value="test3" />
      </Picker>
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