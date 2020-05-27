import React, {Component} from 'react';
import {View} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, NavigationEvents} from 'react-navigation';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import NavService from '../navigationService';

import Home from '../Tab/HomeTab';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderMenu from '../HeaderMenuButton';
import {white} from '../../../constants/colors';
const AppStack = createStackNavigator(
  {
    MainDrawer: {
      screen: () => <Home ref={nav => NavService.setNavigator(nav, 'home')} />,
    },
  },
  {
    initialRouteName: 'MainDrawer',
    defaultNavigationOptions: {
      gestureEnabled: false,
      headerTitleAlign: 'center',
      headerTintColor: white,
      headerRight: () => (
        <_TouchItem
          style={{marginRight: 10, flexDirection: 'row'}}
          onPress={() => {}}>
          <Icon
            name={'heart-outline'}
            color={'black'}
            size={40}
            style={{marginRight: 10}}
          />
          <Icon
            name={'cart-outline'}
            color={'black'}
            size={40}
            style={{marginRight: 5}}
          />
        </_TouchItem>
      ),
      headerTitle: () => <View />,
      headerLeft: () => <HeaderMenu />,
      headerStyle: {
        shadowOpacity: 0,
        shadowOffset: {
          height: 0,
        },
        shadowRadius: 0,
      },
    },
    // headerTransitionPreset: 'uikit'
  },
);
export default createAppContainer(AppStack);
