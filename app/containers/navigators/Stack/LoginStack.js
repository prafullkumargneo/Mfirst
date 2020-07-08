import React, {Component} from 'react';

import {
  Button,
  Text,
  SafeAreaView,
  Image,
  Keyboard,
  Alert,
  AsyncStorage,
  StatusBar,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, NavigationEvents} from 'react-navigation';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _SignInEmail from '../../screens/SignIn/_SignInEmail';
import _SignInPhone_1 from '../../screens/SignIn/_SignInPhone_1';
import _SignInPhone_2 from '../../screens/SignIn/_SignInPhone_2';
import _SignUp from '../../screens/SignUp/_SignUp';
import NavService from '../navigationService';
import {greyIcon} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const LoginNavigator = createStackNavigator(
  {
    SignInEmail: {
      screen: _SignInEmail,
      navigationOptions: {
        headerTitle: 'Sign In',
        headerLeft: () => {
          return (
            <_TouchItem
              style={{margin: 10}}
              onPress={() => {
                // NavService.goBack('root');
                NavService.navigate('root', 'MainDrawer');
              }}>
              <Icon
                style={{fontSize: 40}}
                name={'chevron-left'}
                color={greyIcon}
                size={50}
              />
            </_TouchItem>
          );
        },
      },
    },
    SignInPhone: {
      screen: _SignInPhone_1,
      navigationOptions: {
        headerTitle: 'Sign In',
      },
    },
    SignInCode: {
      screen: _SignInPhone_2,
      navigationOptions: {
        headerTitle: 'Sign In',
      },
    },
    SignUp: {
      screen: _SignUp,
      navigationOptions: {
        headerTitle: 'Create An Account',
      },
    },
  },
  {
    initialRouteName: 'SignInEmail',
    defaultNavigationOptions: {
      headerTintColor: 'black',
      headerTitleAlign: 'center',
      headerBackTitle: 'Back',
    },
    // headerTransitionPreset: 'uikit'
  },
);
export default createAppContainer(LoginNavigator);
