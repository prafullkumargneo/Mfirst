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

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import _TouchItem from '../../components/TouchItem/_TouchItem';
import NavService from './navigationService';
import MainDrawer from './MainDrawer/MainDrawer';

import Login from './Stack/LoginStack';
import LoginPhone from './Stack/LoginPhoneStack';
import DiscoverNavigator from './Stack/DiscoverStack';
import ProductDetails from '../screens/ProductDetails/productDetails';
import CartNavigator from './Stack/CartStack';
import AppStack from './Stack/AppStack';
import HeaderMenu from './HeaderMenuButton';
import { white } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    DiscoverNavigator: {
      screen: () => (
        <DiscoverNavigator ref={nav => NavService.setNavigator(nav, 'discover')} />
      ),
      navigationOptions: {
        headerShown: false,
      },
    },
    Cart: {
      screen: () => (
        <CartNavigator ref={nav => NavService.setNavigator(nav, 'cart')} />
      )
    },
    ProductDetailsStack: {
      screen: ProductDetails,
      navigationOptions: {
        // gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerTintColor: white,
        headerRight: () => (
          <_TouchItem
            style={{ marginRight: 10, flexDirection: 'row' }}
            onPress={() => {NavService.navigate('root', 'Cart'); }}>
            <Icon
              name={'cart-outline'}
              color={'black'}
              size={22}
              style={{ marginRight: 5 }}
            />
          </_TouchItem>
        ),
        headerTitle: "Details",
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        },
        // headerStyle: {
        //   shadowOpacity: 0,
        //   shadowOffset: {
        //     height: 0,
        //   },
        //   shadowRadius: 0,
        // },
      },
    },
  }
);

export default createAppContainer(RootNavigation);
