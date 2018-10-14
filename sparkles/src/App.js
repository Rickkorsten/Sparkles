import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation';
import Icon from 'react-native-ionicons'
// import redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// reducer
import reducers from './reducers';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

import HomeScreen from './screens/HomeScreen/HomeScreen'
import UserScreen from './screens/UserScreen/UserScreen'
import ChatsScreen from './screens/ChatsScreen/ChatsScreen'


const Rootstack = createBottomTabNavigator(
  {
  User: {
    screen: UserScreen,
    navigationOptions: {
      tabBarLabel: 'Account',
      tabBarIcon: ({ tintColor }) => (
        <Icon ios="md-person" color={tintColor} android="md-person" size={24} />
      )
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Spark',
      tabBarIcon: ({ tintColor }) => (
        <Icon ios="md-home" color={tintColor} android="md-home" size={24} />
      )
    }
  },
  Chats: {
    screen: ChatsScreen,
    navigationOptions: {
      tabBarLabel: 'Sparks',
      tabBarIcon: ({ tintColor }) => (
        <Icon ios="md-chatbubbles" color={tintColor} android="md-chatbubbles" size={24} />
      )
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#f19894',
    showLabel: false
  }
}
);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  }

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
  },
});

