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
  ActivityIndicator, TextInput
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RNToasty } from 'react-native-toasty';
import _Input from '../../../components/Input/_Input';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import appStyles from '../../../constants/appStyle';
import * as colors from '../../../constants/colors';
import styles from './styles';
import signIn from '../../../actions/auth/signInAction';
import { deviceWidth, deviceHeight } from '../../../constants/globals';

class _SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValidationFlag: false,
      emailEmptyCheck:false,
      passwordValidationFlag:false
    };

    this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
      //Put your code here you want to rerender, in my case i want to rerender the data 
      //im fetching from firebase and display the changes

      this.someAction();
      this.forceUpdate();
    });
  }

  someAction() {
    // alert('Some action is called!');
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    console.log("params",params)
    // alert()
  }
  componentWillUnmount() {
    this.reRenderSomething.remove();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    console.log("in will receive props", nextProps, prevState)
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
        email: email,
        emailEmptyCheck:false
      });
    }
    else {
      this.setState({
        emailValidationFlag: false,
        email: email,
        emailEmptyCheck:false
      });
    }

  }


  login = () => {
  
    if (this.state.email === "") {
      this.setState({emailEmptyCheck:true})
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
      this.setState({passwordValidationFlag:true})
      RNToasty.Error({
        title: "Password cannot be blank",
        titleSize: 15
      })
    }
    else {
      console.log("email,and password", this.state.email, this.state.password)
      let signInData = {
        login: this.state.email,
        password: this.state.password
      }

      this.props.signIn(signInData)
    }



  };
  signInWithPhone = () => {
    this.props.navigation.navigate({
      routeName: 'SignInPhone'
    });

  };
  createAccount = () => {
    this.props.navigation.navigate({
      routeName: 'SignUp',
    });
  };
  render() {
    console.log("data from signinreducer", this.props.signInReducer)
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

            <View style={{ paddingHorizontal: deviceWidth * 0.06, paddingVertical: deviceHeight * 0.01, backgroundColor: "transparent", paddingTop: deviceHeight * 0.06 }}>
              <TextInput
                style={[styles.inputStyles, { borderColor: this.state.emailEmptyCheck ||this.state.emailValidationFlag ? 'red' : "#A5A5A5" }]}
                returnKeyType="next"
                keyboardType="email-address"
                // onChangeText={email => this.emailValidation(email)}
                onChangeText={email => this.setState({email:email})}
                placeholder={"Email"}
                placeholderTextColor={this.state.emailEmptyCheck ||this.state.emailValidationFlag ? 'red' : colors.lightGrey}
                value={this.state.email}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}

              />
            </View>

            <View style={{ paddingHorizontal: deviceWidth * 0.06, paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
              <TextInput
                ref={(input) => { this.secondTextInput = input; }}
                style={[styles.inputStyles,{borderColor: this.state.passwordValidationFlag ? 'red' : "#A5A5A5" }]}
                onChangeText={password => this.setState({ password,passwordValidationFlag:false })}
                placeholder={"Password"}
                placeholderTextColor={ this.state.passwordValidationFlag ? 'red' :colors.lightGrey}
                value={this.state.password}
              />
            </View>
            {/* <View style={{ paddingTop: 15 }}>
              <_Input
                ref={el => (this.email = el)}
                label=""
                placeholder="Email"
                onChangeText={email => this.emailValidation(email)}
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
                onChangeText={password => this.setState({ password })}
                text={this.state.password}
                returnKeyType="next"
                keyboardType="default"
                onSubmitEditing={() => { }}
                validationMode="req"
                theme="primary"
                secureTextEntry
                placeholderTextColor={colors.greyLight}
              />
            </View> */}

            <View style={{ paddingVertical: "2%", paddingBottom: "10%", paddingHorizontal: "6%" }}>
              <_TouchItem onPress={() => console.log('Hello')}>
                <_Text style={styles.resetBtnText}>Reset Password</_Text>
              </_TouchItem>
            </View>

          </View>

          <_Button disabled={this.props.signInReducer.signinLoading} text={this.props.signInReducer.signinLoading ? "Please wait.." : "Sign In"} theme="primary" onPress={this.login} />

          <View style={styles.createAccount}>
            <_TouchItem onPress={this.createAccount}>
              <_Text style={styles.createAccountBtnText}>Create an Account</_Text>
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

function mapStateToProps(state) {
  return {
    signInReducer: state.signInReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ signIn }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_SignUp)
