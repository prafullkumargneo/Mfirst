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
import _RadioCheck from '../../../components/RadioCheck/_RadioCheck';
import appStyles from '../../../constants/appStyle';

import * as colors from '../../../constants/colors';
import styles from './styles';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    //console.log(props);
    //this.props.navigation.setOptions({title: 'Hello'});
  }

  login = () => {};
  onToggleCheckBox = () => {};
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
          <View style={{paddingTop: 20}}>
            <_Input
              ref={el => (this.firstName = el)}
              label=""
              placeholder="First Name"
              onChangeText={firstName => this.setState({firstName})}
              text={this.state.firstName}
              returnKeyType="next"
              keyboardType="default"
              onSubmitEditing={() => this.idInput.focusInput()}
              maxLength={20}
              validationMode="req"
              placeholderTextColor={colors.greyLight}
              theme="primary"
            />
            <_Input
              ref={el => (this.lastName = el)}
              label=""
              placeholder="Last name"
              onChangeText={lastName => this.setState({lastName})}
              text={this.state.lastName}
              returnKeyType="next"
              keyboardType="default"
              onSubmitEditing={() => this.idInput.focusInput()}
              maxLength={20}
              validationMode="req"
              placeholderTextColor={colors.greyLight}
              theme="primary"
            />
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

          <_Button text="Create Account" theme="primary" onPress={this.login} />

          <_RadioCheck
            style={{marginBottom: 25}}
            label="I agree with Terms & Conditions"
            checked={true}
            labelStyle={styles.checkbox}
            font="B"
            onToggleCheck={() => this.onToggleCheckBox('1')}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
