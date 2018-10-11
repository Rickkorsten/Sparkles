import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../actions'

class UserScreen extends Component {

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
    // add user to app state
    this.props.setActiveUser(this.state.activeUser)
  }

  render() {
    console.log(this.props.activeUser)
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

const mapStateToProps = state => {
  return { activeUser: state.activeUser }
};

export default connect(mapStateToProps, actions)(UserScreen);