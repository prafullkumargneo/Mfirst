import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
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

import appStyles from '../../../constants/appStyle';

import * as colors from '../../../constants/colors';
import styles from './styles';

export default class _SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  login = () => {};
  signInWithPhone = () => {
    this.props.navigation.navigate({
      routeName: 'SignInPhone',
    });
  };
  createAccount = () => {
    this.props.navigation.navigate({
      routeName: 'SignUp',
    });
  };
  render() {
    return (
      <SafeAreaView style={[appStyles.container]}>
        <StatusBar
          barStyle="default"
          translucent={false}
          backgroundColor={colors.primaryColor}
          animated={true}
        />
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          style={{
            width: '100%',
            backgroundColor: colors.white,
          }}>
          <View style={styles.reset}>
            <View style={{paddingTop: 20}}>
              <_Input
                ref={el => (this.email = el)}
                label=""
                placeholder="Email"
                onChangeText={email => this.setState({email})}
                text={this.state.email}
                returnKeyType="next"
                keyboardType="email-address"
                onSubmitEditing={() => this.idInput.focusInput()}
                validationMode="req|mail"
                placeholderTextColor={colors.greyLight}
                theme="primary"
              />
              <_Input
                ref={el => (this.idInput = el)}
                label=""
                placeholder="Password"
                onChangeText={password => this.setState({password})}
                text={this.state.password}
                returnKeyType="next"
                keyboardType="default"
                onSubmitEditing={() => {}}
                validationMode="req"
                theme="primary"
                secureTextEntry
                placeholderTextColor={colors.greyLight}
              />
            </View>

            <_TouchItem onPress={() => console.log('Hello')}>
              <_Text style={styles.resetBtnText}>Reset Password</_Text>
            </_TouchItem>
          </View>

          <_Button text="Sign In" theme="primary" onPress={this.login} />

          <View style={styles.createAccount}>
            <_TouchItem onPress={this.createAccount}>
              <_Text style={styles.createAccountBtnText}>Create Account</_Text>
            </_TouchItem>
          </View>

          <_Button
            text="Continue with your phone"
            theme="secondary"
            onPress={this.signInWithPhone}
            leftIcon
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
