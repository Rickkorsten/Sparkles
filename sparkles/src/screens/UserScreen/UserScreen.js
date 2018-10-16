import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity, StatusBar } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class UserScreen extends Component {

  state = {
    allUsers: undefined
  }

  componentWillMount() {
    this.getAllUsers()
  }

  getAllUsers = () => {
    axios.get('https://sparklesapi.azurewebsites.net/user')
      .then(result => {
        this.setState({
          allUsers: result.data.users,
          activeUserId: result.data.users[0]._id,
        }, () => this.props.setActiveUser(result.data.users[0]));
      })
  }

  setUser = (itemValue) => {
    this.setState({ activeUserId: itemValue }, () => {

      const result = this.state.allUsers.filter(obj => {
        return obj._id === this.state.activeUserId
      });

      this.props.setActiveUser(result[0])
    });
  }

  login = () => {
    const { device_id, lastName } = this.props.activeUser;

    const authUser = {
      'device_id': device_id,
      'lastName': lastName
    }
    axios.post('https://sparklesapi.azurewebsites.net/user/login', authUser)
      .then(result => {
        this.props.setAuthToken(result.data.token);
        this.props.navigation.navigate('Home');
      });
  }

  render() {
    if (!this.state.allUsers) {
      return <Text>loading...</Text>
    } else {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
          />
          <Picker
            selectedValue={this.state.activeUserId}
            style={{ height: 150, width: "80%" }}
            onValueChange={(itemValue, itemIndex) => this.setUser(itemValue)}>
            {
              this.state.allUsers.map(user => {
                return (
                  <Picker.Item key={user._id} label={user.firstName + ' ' + user.lastName} value={user._id} />
                )
              })
            }
          </Picker>
          <TouchableOpacity style={styles.matchButton} onPress={this.login}>
            <Text style={styles.matchButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  matchButton: {
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 16,
    borderTopRightRadius: 4,
    backgroundColor: '#f19894',
    marginBottom: -60,
    marginTop: 100
  },
  matchButtonText: {
    color: '#fff',
    fontFamily: 'Raleway-Light',
    fontSize: 18,
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
  return {
    activeUser: state.activeUser,
    authToken: state.authToken
  }
};

export default connect(mapStateToProps, actions)(UserScreen);