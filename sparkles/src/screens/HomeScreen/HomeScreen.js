import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';

const width = '80%';
const height = '80%';

class HomeScreen extends Component {

  componentWillMount() {
  }

  renderSearchView = () => {
    return (
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
    )
  }

  renderActiveView = () => {
    return (

      <ImageBackground
        source={{uri: 'https://scontent-amt2-1.cdninstagram.com/vp/eb7bd82f523c49eefcd21cb0d3222225/5C8ABB3D/t51.2885-15/e35/36918017_1994195137272064_6412393113595150336_n.jpg'}}
        imageStyle={{resizeMode: 'cover', width: '100%', height: '100%'}}
        style={styles.sparkContainerActive}
        blurRadius={12}>
          <Text> </Text>
          <Text style={styles.sparkName}>Rick</Text>
        </ImageBackground>
    )
  }

  render() {
    const { search_spark } = this.props.activeUser;
    let content;

    if (!search_spark) {
      content = this.renderSearchView()
    } else {
      content = this.renderActiveView()
    }
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Sparkles</Text>
          {content}
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
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,    
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sparkContainerActive: {
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,    
      },
      android: {
        elevation: 12,
      },
    }),
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
  sparkName: {
    marginBottom: 30,
    marginLeft: 30,
    fontFamily: 'Raleway-Light',
    fontSize: 32,
    color: 'white'
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
  },
  elevationLow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,    
      },
      android: {
        elevation: 5,
      },
    }),
  },

});

const mapStateToProps = state => {
  return {
    activeUser: state.activeUser,
    authToken: state.authToken
  }
};

export default connect(mapStateToProps)(HomeScreen);