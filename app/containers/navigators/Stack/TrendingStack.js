
import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Trending from '../../screens/Trending/_Trending';
import TrendingCategories from "../../screens/Trending/trendingCategoryProducts";
import NavService from '../navigationService';
import { greyIcon } from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TrendingNavigator = createStackNavigator(
    {

        Trending: {
            screen: Trending,

        },
        TrendingCategories: {
            screen: TrendingCategories
        }
    },
    {
        initialRouteName: 'Trending',
        defaultNavigationOptions: {
            headerShown: false
        },
        // headerTransitionPreset: 'uikit'
    },
);
export default createAppContainer(TrendingNavigator);