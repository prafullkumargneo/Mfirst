import React, {Component} from 'react';
import {View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import _Text from '../Text/_Text';
import _TouchItem from '../TouchItem/_TouchItem';
import {greyIcon} from '../../constants/colors';
import * as image_url from '../../assets/images/map';

import styles from './style';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <_TouchItem style={styles.mainNavItem} onPress={() => {}}>
        <View
          style={{
            zIndex: 20,
          }}>
          <Image
            style={{resizeMethod: 'contain'}}
            source={this.props.image_url}
          />
        </View>

        <View style={styles.iconTextContainer}>
          <_Text weight="medium" style={[styles.mainNavText]}>
            {this.props.title}
          </_Text>
        </View>

        <View style={styles.mainNavItemIcon}>
          <Icon
            style={styles.mainNavIcon}
            name={'chevron-right'}
            color={greyIcon}
            size={50}
          />
        </View>
      </_TouchItem>
    );
  }
}
