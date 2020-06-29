/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text,Alert } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import RootNav from './containers/navigators/Root';
import NavService from './containers/navigators/navigationService';
import LoginStack from './containers/navigators/Stack/LoginStack';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';

const store = configureStore;
class App extends React.Component {

  componentDidMount() {
    this.requestUserPermission();
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    if (authStatus) {
      console.log('Permission status:', authStatus);
    }
    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      this.getFcmToken()
      console.log('User has notification permissions enabled.');
    } else if (authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }

  }

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log("Your Firebase Token is:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  }

  setNavRef(ref) {
    NavService.setNavigator(ref, 'root');
  }
  render() {
    return (
      <Provider store={store}>

        <RootNav ref={navRef => this.setNavRef(navRef)} />
      </Provider>
    )
  }
}

export default App;
