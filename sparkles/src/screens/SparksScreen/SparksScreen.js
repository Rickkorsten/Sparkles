import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import LottieView from 'lottie-react-native';
import axios from 'axios';

const width = '80%';
const height = '80%';

const Button = (props) => {
    return (
      <TouchableOpacity onPress={props.onPress} on style={props.border ? styles.matchButton : styles.searchBatch}>
        <Text style={props.border ? styles.matchButtonText : styles.searchBatchText}>{props.title}</Text>
      </TouchableOpacity>
    )
}

class SparksScreen extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    activeUser: this.props.activeUser,
  }

  async componentDidMount() {
    const { _id } = this.props.activeUser;
    axios.get(`https://sparklesapi.azurewebsites.net/relation/passed_relation/${_id}`).then(result => {
      console.log(result)
    })
  }

  renderNoSparksView = () => {
    const { status } = this.props.activeUser;
    return (
      <View style={styles.sparkContainer}>
        <Text style={styles.underline}>
          You don't have{"\n"}
          any Sparks yet
        </Text>
      </View>
    )
  }

  renderActiveView = () => {
    return (
      <View  style={styles.sparkBlock}> 
        <Text>a </Text>
        <Text>a </Text>
        <Text>a </Text>
        <Text>a </Text>
        <Text>a </Text>
        <Text style={styles.sparkName}>{}</Text>
      </View>
    )
  }

  render() {
    const { _id, status } = this.props.activeUser;
    let content;

    if (status == 'no_relation' || status == 'searching') {
      content = this.renderNoSparksView()
    } else if (this.state.relationUserData) {
      content = this.renderActiveView()
    }

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Sparks</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: 'white'
  },
  sparkContainer: {
    width: '80%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkBlock: {
    width: '40%',
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: "center",
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
  sparkBlockImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  logo: {
    marginTop: 35,
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
  searchBatch: {
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 16,
    borderTopRightRadius: 4,
    backgroundColor: '#fff',
    marginBottom: -60,
    marginTop: 100
  },
  searchBatchText: {
    color: '#f19894',
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
    authToken: state.authToken,
    activeRelation: state.activeRelation
  }
};

export default connect(mapStateToProps, actions)(SparksScreen);