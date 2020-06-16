/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import configureStore from './stores/configureStore';
import RootNav from './containers/navigators/Root';
import NavService from './containers/navigators/navigationService';
import LoginStack from './containers/navigators/Stack/LoginStack';
const store = configureStore;
class App extends React.Component {
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
