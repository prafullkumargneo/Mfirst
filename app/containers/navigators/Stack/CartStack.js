import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ShoppingCart from '../../screens/Cart/ShoppingCart';
import NavService from '../navigationService';
import { greyIcon } from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CartNavigator = createStackNavigator(
    {

      
        ShoppingCart: {
            screen: ShoppingCart
        }
    },
    {
        initialRouteName: 'ShoppingCart',
        defaultNavigationOptions: {
            headerShown: false
        },
        // headerTransitionPreset: 'uikit'
    },
);
export default createAppContainer(CartNavigator);