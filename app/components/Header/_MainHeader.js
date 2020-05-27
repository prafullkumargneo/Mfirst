import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Alert,
  AsyncStorage,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _TouchItem from '../TouchItem/_TouchItem';

export default class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  updateSearch = search => {
    this.setState({search});
  };

  openDrawer() {
    console.log('hello');
  }
  render() {
    const {search} = this.state;
    return (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          alignSelf: 'center',
          right: 0,
          left: 0,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
        }}>
        <_TouchItem
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}
          onPress={() => {
            this.props.onPressMenu();
          }}>
          <Icon
            style={styles.mainNavIcon}
            name={'menu'}
            color={'black'}
            size={35}
          />
        </_TouchItem>

        <View style={{flex: 3}} />
        <_TouchItem
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}
          onPress={() => {}}>
          <Icon
            style={styles.mainNavIcon}
            name={'heart-outline'}
            color={'black'}
            size={35}
          />
        </_TouchItem>
        <_TouchItem
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}
          onPress={() => {}}>
          <Icon
            style={styles.mainNavIcon}
            name={'cart-outline'}
            color={'black'}
            size={35}
          />
        </_TouchItem>
      </View>
    );
  }
}
