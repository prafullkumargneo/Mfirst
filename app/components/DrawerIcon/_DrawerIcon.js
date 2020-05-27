import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import _TouchItem from '../TouchItem/_TouchItem';
import {Feather} from '@expo/vector-icons';
import * as colors from '../../constants/colors';

export default class DrawerIcon extends Component {
  render() {
    if (this.props.type === 'back') {
      return (
        <_TouchItem
          style={styles.iconContainer}
          ripple
          onPress={() => this.props.navigation.pop()}>
          <Feather name="chevron-left" size={22} style={styles.icon} />
        </_TouchItem>
      );
    }

    return (
      <_TouchItem
        style={styles.iconContainer}
        ripple
        onPress={() => this.props.navigation.openDrawer()}>
        <Feather name="align-left" size={22} style={styles.icon} />
      </_TouchItem>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 15,
  },
  icon: {
    color: colors.primaryColor,
  },
});
