import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import TouchItem from '../../components/TouchItem/_TouchItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavService from './navigationService';

export default class HeaderMenuButton extends PureComponent {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', paddingLeft: 20}}>
        <TouchItem
          ripple
          onPress={() => NavService.getNavigator('drawer').openDrawer()}>
          <Icon name={'menu'} color={'black'} size={40} />
        </TouchItem>
      </View>
    );
  }
}
