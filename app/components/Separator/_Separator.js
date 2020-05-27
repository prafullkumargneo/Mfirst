import React, {PureComponent} from 'react';
import {View, Platform, StyleSheet} from 'react-native';

import {greyLight} from '../../constants/colors';

export default class Separator extends PureComponent {
  render() {
    return (
      <View
        style={{
          height: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 1,
          backgroundColor: greyLight,
        }}
      />
    );
  }
}
