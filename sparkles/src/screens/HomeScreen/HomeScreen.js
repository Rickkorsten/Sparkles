import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class HomeScreen extends Component {

  componentWillMount() {
    console.log(this.props.activeUser[0])
  }

  render() {
    console.log(this.props.activeUser)
    return (
      <View style={styles.container}>
        <Text>{this.props.activeUser.firstName}</Text>
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

export default connect(mapStateToProps)(HomeScreen);