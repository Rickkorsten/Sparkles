import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-ionicons'
// import redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// reducer
import reducers from './reducers';

import HomeScreen from './screens/HomeScreen/HomeScreen'
import UserScreen from './screens/UserScreen/UserScreen'
import ChatsScreen from './screens/ChatsScreen/ChatsScreen'

const Rootstack = createBottomTabNavigator({
  User: {
    screen: UserScreen,
    navigationOptions: {
      tabBarLabel: 'Account',
      tabBarIcon: ({ tintColor }) => (
        <Icon ios="ios-person" android="md-person" size={24} />
      )
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Spark',
      tabBarIcon: ({ tintColor }) => (
        <Icon ios="ios-home" android="md-home" size={24} />
      )
    }
  },
  Chats: {
    screen: ChatsScreen,
    navigationOptions: {
      tabBarLabel: 'Sparks',
      tabBarIcon: ({ tintColor }) => (
        <Icon ios="ios-chatboxes" android="ios-chatboxes" size={24} />
      )
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <Rootstack />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

