import React, {Component} from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import _SignInPhone_1 from '../../screens/SignIn/_SignInPhone_1';
import _SignInPhone_2 from '../../screens/SignIn/_SignInPhone_2';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import NavService from '../navigationService';
import {greyIcon} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginPhoneNavigator = createStackNavigator(
  {
    SignInPhone: {
      screen: _SignInPhone_1,
      navigationOptions: {
        headerTitle: 'Sign In',
        headerLeft: () => {
          return (
            <_TouchItem
              style={{margin: 10}}
              onPress={() => {
                NavService.goBack('root');
                // NavService.navigate('root', 'Home');
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
    SignInCode: {
      screen: _SignInPhone_2,
      navigationOptions: {
        headerTitle: 'Sign In',
      },
    },
  },
  {
    initialRouteName: 'SignInPhone',
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerBackTitle: 'Back',
    },
    // headerTransitionPreset: 'uikit'
  },
);
export default createAppContainer(LoginPhoneNavigator);
