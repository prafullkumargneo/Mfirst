
import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import _Discover from '../../screens/Discover/_Discover';
import DiscoverCategories from "../../screens/Discover/_DiscoverCategories"
import NavService from '../navigationService';
import { greyIcon } from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DiscoverCategoriesNavigator = createStackNavigator(
    {

        DiscoverCategories: {
            screen: DiscoverCategories,

        }
    },
    {
        initialRouteName: 'DiscoverCategories',
      
        // headerTransitionPreset: 'uikit'
    },
);
export default createAppContainer(DiscoverCategoriesNavigator);