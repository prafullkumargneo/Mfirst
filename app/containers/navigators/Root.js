/* eslint-disable react/display-name */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Keyboard,
  Alert,
  AsyncStorage,
  StatusBar,
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import _TouchItem from '../../components/TouchItem/_TouchItem';
import NavService from './navigationService';
import MainDrawer from './MainDrawer/MainDrawer';

import Login from './Stack/LoginStack';
import LoginPhone from './Stack/LoginPhoneStack';
import AppStack from './Stack/AppStack';

import {white} from '../../constants/colors';

const RootNavigation = createStackNavigator(
  {
    MainDrawer: {
      screen: () => (
        <MainDrawer ref={navRef => NavService.setNavigator(navRef, 'drawer')} />
      ),
      navigationOptions: {
        headerShown: false,
      },
    },

    Login: {
      screen: () => (
        <Login ref={nav => NavService.setNavigator(nav, 'login')} />
      ),
      navigationOptions: {
        headerShown: false,
      },
    },
    LoginPhone: {
      screen: () => (
        <LoginPhone ref={nav => NavService.setNavigator(nav, 'loginPhone')} />
      ),
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'MainDrawer',

    // headerTransitionPreset: 'uikit'
  },
);

export default createAppContainer(RootNavigation);
