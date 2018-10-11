import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker } from 'react-native';
import axios from 'axios';

export default class UserScreen extends Component {

  constructor(props) {
    super(props);
    state = {
    }
  }

  componentWillMount() {
    this.getAllUsers()
    this.setState({ activeUser: [] })
  }

  getAllUsers = () => {
    axios.get('http://localhost:3000/user')
      .then(result => {
        console.log(result.data.users);
        this.setState({ allUsers: result.data.users });
        this.setState({ activeUserId: result.data.users[0]._id })
        this.setState({ activeUser: result.data.users[0]})
      })
  }

  setUser = (value) => {
    const result = this.state.allUsers.filter(obj => {
      return obj._id === value
    });
    this.setState({ activeUser: result[0] });
    console.log(this.state.activeUser);
  }

  render() {
    if (!this.state.allUsers) {
      return <Text>loading...</Text>
    }
    return (
      <View style={styles.container}>
        <Text>Kies een gebruiker</Text>
        <Picker
          selectedValue={this.state.activeUserId}
          style={{ height: 150, width: "80%" }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ activeUserId: itemValue });
            this.setUser(itemValue);
          }}>
          {
            this.state.allUsers.map(user => {
              return (
                <Picker.Item label={user.firstName + ' ' + user.lastName} value={user._id} />
              )
            })
          }
        </Picker>
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