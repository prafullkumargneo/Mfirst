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

export default class _SignInPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }

  login = () => {
    this.props.navigation.state.params.onNavigateBack()
    this.props.navigation.goBack()
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
          <View style={styles.phoneContainer}>
            <_Text style={styles.phoneTitle}>Enter your phone number</_Text>

            <_Input
              ref={el => (this.phone = el)}
              label=""
              placeholder=""
              onChangeText={phone =>
                this.setState({
                  phone: phone.replace(/[^0-9]/g, ''),
                })
              }
              text={this.state.phone}
              returnKeyType="next"
              keyboardType="phone-pad"
              onSubmitEditing={() => this.idInput.focusInput()}
              maxLength={20}
              validationMode="req|phone"
              placeholderTextColor={colors.greyLight}
              theme="phoneNumber"
            />
            <_Text style={styles.phoneVerificationNotice}>
              A Verification code will be sent to your What'sApp.
            </_Text>
            <_Text style={styles.phoneVerificationNotice}>
              You will be prompted to verify it.
            </_Text>
            <_Button text="Continue" theme="primary" onPress={this.login} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
