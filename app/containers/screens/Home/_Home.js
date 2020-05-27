import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Alert,
  AsyncStorage,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import _Input from '../../../components/Input/_Input';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _Header from '../../../components/Header/_MainHeader';

import appStyles from '../../../constants/appStyle';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <SafeAreaView style={[appStyles.container]}>
        <_Header onPressMenu={this.props.navigation.toggleDrawer} />

        <View
          style={{
            margin: 20,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.select({
      android: '10%',
      default: '8%',
    }),
    paddingTop: 0,
    backgroundColor: 'white',

    justifyContent: 'space-around',
  },
});
