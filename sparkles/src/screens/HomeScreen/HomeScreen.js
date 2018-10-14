import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';


class HomeScreen extends Component {

  componentWillMount() {
    console.log(this.props.activeUser[0])
  }

  render() {
    console.log(this.props.activeUser)
    return (
      <View style={styles.container}>
      <LottieView
        style={{
          width: 100
        }}
        source={require('./../../../assets/animation-searching.json')}
        autoPlay
        loop
      />
        <Text style={styles.underline}>
        Looking for the{"\n"}
        perfect Spark</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  underline: {
    marginTop: 20,
    fontFamily: 'Raleway-Light',
    fontSize: 22,
    textAlign: 'center'
  }

});

const mapStateToProps = state => {
  return { activeUser: state.activeUser }
};

export default connect(mapStateToProps)(HomeScreen);