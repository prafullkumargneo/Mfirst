import React, { Component } from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RNToasty } from 'react-native-toasty';
import _Input from '../../../components/Input/_Input';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _RadioCheck from '../../../components/RadioCheck/_RadioCheck';
import appStyles from '../../../constants/appStyle';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as colors from '../../../constants/colors';
import styles from './styles';
import signUp from '../../../actions/auth/signUpAction';
import NavService from '../../navigators/navigationService';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      emailValidationFlag: false,
    
    };
  }

  componentDidMount() {
    //console.log(props);
    //this.props.navigation.setOptions({title: 'Hello'});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    console.log("in will receive props of signup", nextProps, prevState)
    if (nextProps.signUpReducer && nextProps.signUpReducer.signUpData) {
      NavService.navigate('root', 'MainDrawer');
// return(
//   NavService.navigate('home','home')
// )
    }
    // return {
    //   cachedSomeProp: nextProps.someProp,
    //   // ... other derived state properties
    // };
  }

  emailValidation(email) {
    var mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!mail.test(this.state.email)) {
      this.setState({
        emailValidationFlag: true,
        email: email
      });
    }
    else {
      this.setState({
        emailValidationFlag: false,
        email: email
      });
    }

  }


  login = () => {

    if (this.state.firstName === "") {
      RNToasty.Error({
        title: "First Name cannot be blank",
        titleSize: 15
      })
    }
    else if (this.state.lastName === "") {
      RNToasty.Error({
        title: "Last Name cannot be blank",
        titleSize: 15
      })
    }
    else if (this.state.email === "") {

      RNToasty.Error({
        title: "Email cannot be blank",
        titleSize: 15
      })


    }
    else if (this.state.emailValidationFlag) {
      RNToasty.Error({
        title: "Please enter valid email",
        titleSize: 15
      })
    }
    else if (this.state.password === "") {
      RNToasty.Error({
        title: "Password cannot be blank",
        titleSize: 15
      })
    }
    else {

      RNToasty.Success({
        title: "working",
        titleSize: 15
      })

      let signUpData = {
        login: this.state.email,
        name: this.state.firstName + "" + this.state.lastName,
        password: this.state.password,
        confirmpassword: this.state.password,
        token: null
      }
      this.props.signUp(signUpData)
    }



  };
  onToggleCheckBox(status) {

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
          <View style={{ paddingVertical: "4%" }}>
            <_Input
              ref={el => (this.firstName = el)}
              label=""
              placeholder="First Name"
              onChangeText={firstName => this.setState({ firstName })}
              text={this.state.firstName}
              returnKeyType="next"
              keyboardType="default"
              maxLength={20}
              validationMode="req"
              placeholderTextColor={colors.greyLight}
              theme="primary"
            />
            <_Input
              ref={el => (this.lastName = el)}
              label=""
              placeholder="Last name"
              onChangeText={lastName => this.setState({ lastName })}
              text={this.state.lastName}
              returnKeyType="next"
              keyboardType="default"
              maxLength={20}
              validationMode="req"
              placeholderTextColor={colors.greyLight}
              theme="primary"
            />
            <_Input
              ref={el => (this.email = el)}
              label=""
              placeholder="Email"
              onChangeText={email => this.emailValidation(email)}
              text={this.state.email}
              returnKeyType="next"
              keyboardType="email-address"
              validationMode="req|mail"
              placeholderTextColor={colors.greyLight}
              theme="primary"
            />
            <_Input
              ref={el => (this.idInput = el)}
              label=""
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              text={this.state.password}
              returnKeyType="next"
              keyboardType="default"
              validationMode="req"
              theme="primary"
              secureTextEntry
              placeholderTextColor={colors.greyLight}
            />
          </View>
          <View style={{ paddingTop: "2%" }}>
            <_Button disabled={this.props.signUpReducer.signUpLoading} text={this.props.signUpReducer.signUpLoading ? "Please wait.." : "Create Account"} theme="primary" onPress={this.login} />
          </View>
          <_RadioCheck
            style={{ marginBottom: 25 }}
            label="I agree with Terms & Conditions"
            checked={true}
            labelStyle={styles.checkbox}
            font="B"
            onToggleCheck={(status) => this.onToggleCheckBox(status)}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    signUpReducer: state.signUpReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ signUp }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)