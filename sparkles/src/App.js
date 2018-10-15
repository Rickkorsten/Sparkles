import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation';


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

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

const Rootstack = createBottomTabNavigator(
  {
  User: {
    screen: UserScreen,
    navigationOptions: {
      tabBarLabel: 'Account',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="sparkles-user" size={22} color={ tintColor } />

      )
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Spark',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="spark" size={30} color={ tintColor } />
        //<Text style={styles.name}>Julia</Text>
        )
    }
  },
  Chats: {
    screen: ChatsScreen,
    navigationOptions: {
      tabBarLabel: 'Sparks',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="sparks" size={22} color={ tintColor } />
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

  name: {
    fontFamily: 'Raleway-Light',
    fontSize: 20,
  }
});

