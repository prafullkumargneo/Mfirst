import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import PaymentMethod from '../../screens/Payment/paymentMethod';

import NavService from '../navigationService';
import { greyIcon } from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentNavigator = createStackNavigator(
    {

      
        PaymentMethod: {
            screen: PaymentMethod
        },
       
    },
    {
        initialRouteName: 'PaymentMethod',
        defaultNavigationOptions: {
            headerShown: false
        },
        // headerTransitionPreset: 'uikit'
    },
);
export default createAppContainer(PaymentNavigator);