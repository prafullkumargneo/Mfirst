import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import _Categories from '../../screens/Categories/_Categories';
import _Discover from '../../screens/Discover/_Discover';
import DiscoverNavigator from "../Stack/DiscoverStack";
import _Trending from '../../screens/Trending/_Trending';
import * as colors from '../../../constants/colors';

const HomeTabNav = createMaterialTopTabNavigator(
  {
    Categories: {
      screen: _Categories,
    },
    Trending: {
      screen: _Trending,
    },
    Discover: {
      screen: DiscoverNavigator,
      
    }
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontWeight: 'bold',
      },

      indicatorStyle: {
        opacity: 0,
      },

      indicatorStyle: {
        height: '100%',
        backgroundColor: colors.primaryColor,
        borderRadius: 40,
      },
      style: {
        height:"6%",
        backgroundColor: colors.white,
        shadowOpacity: 0,
        shadowOffset: {
          height: 0,
        },
        shadowRadius: 0,
        shadowColor: 'transparent',
        elevation: 0
      },
      activeTintColor: colors.white,
      inactiveTintColor: colors.primaryColor,
    },
  },
);

export default createAppContainer(HomeTabNav);
