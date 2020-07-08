import React from 'react';

import {StyleSheet, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Home from '../Tab/HomeTab';
import AppStack from '../Stack/AppStack';
import DrawerComponent from './DrawerComponent';
import {white, primaryColor, black} from '../../../constants/colors';

import NavService from '../navigationService';
const styles = StyleSheet.create({
  itemsContainerStyle: {
    // padding: 18
  },
  labelStyle: {
    fontWeight: '400',
    margin: 8,
  },
});

const withHeader = (screen, routeName, title) =>
  createStackNavigator(
    {
      [routeName]: {screen, params: {title}, key: _.now},
    },
    {
      headerMode: 'screen',
      defaultNavigationOptions: ({navigation}) => ({
        gestureEnabled: false,
        headerLeft: () => (
          <View>
            {' '}
            <Text>Left</Text>
          </View>
        ),
        title: title,
        headerTitleAlign: 'center',
        headerTitle: () => (
          <View>
            {' '}
            <Text>Title</Text>
          </View>
        ),
        headerTintColor: white,
        headerRight: () => (
          <View>
            {' '}
            <Text>Right</Text>
          </View>
        ),
        // headerBackground: () => <HeaderBackground />
      }),
    },
  );

const MainDrawer = createDrawerNavigator(
  {
    Home: {
      screen: () => (
        <AppStack ref={nav => NavService.setNavigator(nav, 'app')} />
      ),
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: DrawerComponent,
    drawerWidth: '90%',
    contentOptions: {
      activeBackgroundColor: primaryColor,
      inactiveTintColor: black,
      activeTintColor: black,
      itemsContainerStyle: styles.itemsContainerStyle,
      labelStyle: styles.labelStyle,
    },
    overlayColor: 'rgba(0,0,0,0.7)'
  },
  [],
);

export default createAppContainer(MainDrawer);
