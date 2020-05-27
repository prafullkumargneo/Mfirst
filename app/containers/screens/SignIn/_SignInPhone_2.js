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

export default class _SignInCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code_1: '',
      code_2: '',
      code_3: '',
      code_4: '',
      firstName: '',
      phone: '',
    };
  }

  login = () => {};
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
          <View>
            <_Text style={styles.phoneTitle}>
              Enter the 4-digit code sent to you at (425)324-3244
            </_Text>
            <View style={styles.codeContainer}>
              <_Input
                ref={el => (this.phone = el)}
                label=""
                placeholder=""
                onChangeText={code_1 =>
                  this.setState({
                    code_1: code_1.replace(/[^0-9]/g, ''),
                  })
                }
                text={this.state.code_1}
                returnKeyType="next"
                keyboardType="numeric"
                onSubmitEditing={() => this.idInput.focusInput()}
                maxLength={1}
                validationMode="req|number"
                placeholderTextColor={colors.greyLight}
                theme="phoneNumber"
                code
              />

              <_Input
                ref={el => (this.code_2 = el)}
                label=""
                placeholder=""
                onChangeText={code_2 =>
                  this.setState({
                    code_2: code_2.replace(/[^0-9]/g, ''),
                  })
                }
                text={this.state.code_2}
                returnKeyType="next"
                keyboardType="numeric"
                onSubmitEditing={() => this.idInput.focusInput()}
                maxLength={1}
                validationMode="req|number"
                placeholderTextColor={colors.greyLight}
                theme="phoneNumber"
                code
              />

              <_Input
                ref={el => (this.code_3 = el)}
                label=""
                placeholder=""
                onChangeText={code_3 =>
                  this.setState({
                    code_3: code_3.replace(/[^0-9]/g, ''),
                  })
                }
                text={this.state.code_3}
                returnKeyType="next"
                keyboardType="numeric"
                onSubmitEditing={() => this.idInput.focusInput()}
                maxLength={1}
                validationMode="req|number"
                placeholderTextColor={colors.greyLight}
                theme="phoneNumber"
                code
              />

              <_Input
                ref={el => (this.code_4 = el)}
                label=""
                placeholder=""
                onChangeText={code_4 =>
                  this.setState({
                    code_4: code_4.replace(/[^0-9]/g, ''),
                  })
                }
                text={this.state.code_4}
                returnKeyType="next"
                keyboardType="numeric"
                onSubmitEditing={() => this.idInput.focusInput()}
                maxLength={1}
                validationMode="req|number"
                placeholderTextColor={colors.greyLight}
                theme="phoneNumber"
                code
              />
            </View>

            {/* <_Button text="Continue" theme="primary" onPress={this.login} /> */}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
