import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';

const width = '80%';
const height = '80%';

class HomeScreen extends Component {

  componentWillMount() {
    console.log(this.props.activeUser[0])
  }

  render() {
    console.log(this.props.activeUser)
    return (
      <View style={styles.container}>
      <Text style={styles.logo}>Sparkles</Text>
        <View style={styles.sparkContainer}>
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

          <View>
          <TouchableOpacity style={styles.matchButton}>
            <Text style={styles.matchButtonText}>Start a new Spark</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkContainer: {
    width: '80%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  logo: {
    marginBottom: 30,
    fontFamily: 'Raleway-Light',
    fontSize: 32,
    textAlign: 'center'
  },
  underline: {
    marginTop: 20,
    fontFamily: 'Raleway-Light',
    fontSize: 22,
    textAlign: 'center'
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
  return { activeUser: state.activeUser }
};

export default connect(mapStateToProps)(HomeScreen);