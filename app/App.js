/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import RootNav from './containers/navigators/Root';
import NavService from './containers/navigators/navigationService';
import LoginStack from './containers/navigators/Stack/LoginStack';
class App extends React.Component {
  setNavRef(ref) {
    NavService.setNavigator(ref, 'root');
  }
  render() {
    return <RootNav ref={navRef => this.setNavRef(navRef)} />;
  }
}

export default App;
