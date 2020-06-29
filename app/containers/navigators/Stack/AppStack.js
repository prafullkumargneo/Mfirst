import React, {Component} from 'react';
import {View} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, NavigationEvents} from 'react-navigation';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import NavService from '../navigationService';

import Home from '../Tab/HomeTab';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchIcon from 'react-native-vector-icons/AntDesign';
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
        >
          <SearchIcon
            name={'search1'}
            onPress={() => {NavService.navigate('root','SearchBar')}}
            color={'black'}
            size={24}
            style={{marginRight: 23,top:"5%"}}
          />
          <Icon
            name={'heart-outline'}
            onPress={() => {NavService.navigate('root','FavoriteOrders')}}
            color={'black'}
            size={25}
            style={{marginRight: 25,top:"5%"}}
          />
          <Icon
            name={'cart-outline'}
            onPress={() => {NavService.navigate('root','Cart')}}
            color={'black'}
            size={25}
            style={{marginRight: 5,top:"5%"}}
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
        shadowColor: 'transparent',
        elevation: 0
      },
    },
    // headerTransitionPreset: 'uikit'
  },
);
export default createAppContainer(AppStack);
