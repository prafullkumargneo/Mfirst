import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Keyboard,
  Alert,
  StatusBar,TextInput,StyleSheet
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
import { deviceWidth, deviceHeight } from '../../../constants/globals';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      firstNameValidationFlag:false,
      lastName: '',
      lastNameValidationFlag:false,
      email: '',
      emailEmptyCheck:false,
      password: '',
      passwordValidationFlag:false,
      emailValidationFlag: false,
      TermsConditionFlag:true
    };
  }

  componentDidMount() {
    //console.log(props);
    //this.props.navigation.setOptions({title: 'Hello'});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    console.log("in will receive props of signup", nextProps, prevState)
//     if (nextProps.signUpReducer && nextProps.signUpReducer.signUpData !== nextProps.signUpReducer && nextProps.signUpReducer.signUpData ) {
//       NavService.navigate('root', 'MainDrawer');
// // return(
// //   NavService.navigate('home','home')
// // )
//     }
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

    if (this.state.firstName === "") {
      this.setState({firstNameValidationFlag:true})
      RNToasty.Error({
        title: "First Name cannot be blank",
        titleSize: 15
      })
    }
    else if (this.state.lastName === "") {
      this.setState({lastNameValidationFlag:true})
      RNToasty.Error({
        title: "Last Name cannot be blank",
        titleSize: 15
      })
    }
    else if (this.state.email === "") {
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
    else if(!this.state.TermsConditionFlag){
      this.setState({TermsConditionFlag:false})
      RNToasty.Error({
        title: "Select terms and condition to proceed",
        titleSize: 15
      })
    }
    else {
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
this.setState({TermsConditionFlag:status})
  };


  render() {
    console.log("terms",this.state.TermsConditionFlag)
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
          <View style={{ paddingVertical: "8%",backgroundColor:"transparent" }}>


            <View style={{ paddingHorizontal: deviceWidth * 0.06, paddingVertical: deviceHeight * 0.015, backgroundColor: "transparent" }}>
              <TextInput
                returnKeyType="next"
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                style={[customstyle.inputStyles,{borderColor: this.state.firstNameValidationFlag ? 'red' : "#A5A5A5" }]}
                onChangeText={firstName => this.setState({ firstName,firstNameValidationFlag:false})}
                placeholder={"First Name"}
                placeholderTextColor={ this.state.firstNameValidationFlag ? 'red' :colors.lightGrey}
                value={this.state.firstName}
              />
            </View>
            <View style={{ paddingHorizontal: deviceWidth * 0.06, paddingVertical: deviceHeight * 0.015, backgroundColor: "transparent" }}>
              <TextInput
                returnKeyType="next"
                onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                ref={(input) => { this.secondTextInput = input; }}
                style={[customstyle.inputStyles,{borderColor: this.state.lastNameValidationFlag ? 'red' : "#A5A5A5" }]}
                onChangeText={lastName => this.setState({ lastName,lastNameValidationFlag:false })}
                placeholder={"Last name"}
                placeholderTextColor={ this.state.lastNameValidationFlag ? 'red' :colors.lightGrey}
                value={this.state.lastName}
              />
            </View>

          <View style={{ paddingHorizontal: deviceWidth * 0.06, paddingVertical: deviceHeight * 0.015 }}>
              <TextInput
                 ref={(input) => { this.thirdTextInput = input; }}
                style={[customstyle.inputStyles, { borderColor: this.state.emailEmptyCheck ||this.state.emailValidationFlag ? 'red' : "#A5A5A5" }]}
                returnKeyType="next"
                keyboardType="email-address"
                onChangeText={email => this.emailValidation(email)}
                placeholder={"Email"}
                placeholderTextColor={this.state.emailEmptyCheck ||this.state.emailValidationFlag ? 'red' : colors.lightGrey}
                value={this.state.email}
                onSubmitEditing={() => { this.fourthTextInput.focus(); }}

              />
            </View>

            <View style={{ paddingHorizontal: deviceWidth * 0.06, paddingVertical: deviceHeight * 0.015, backgroundColor: "transparent" }}>
              <TextInput
                ref={(input) => { this.fourthTextInput = input; }}
                style={[customstyle.inputStyles,{borderColor: this.state.passwordValidationFlag ? 'red' : "#A5A5A5" }]}
                onChangeText={password => this.setState({ password,passwordValidationFlag:false })}
                placeholder={"Password"}
                placeholderTextColor={ this.state.passwordValidationFlag ? 'red' :colors.lightGrey}
                value={this.state.password}
              />
            </View>



            {/* <_Input
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
            /> */}
          </View>
          <View style={{ paddingTop: "2%" }}>
            <_Button disabled={this.props.signUpReducer.signUpLoading} text={this.props.signUpReducer.signUpLoading ? "Please wait.." : "Create Account"} theme="primary" onPress={this.login} />
          </View>
          <_RadioCheck
            style={{ marginBottom: 25 }}
            label="I agree with Terms & Conditions"
            checked={true}
            labelStyle={[customstyle.checkbox,{ color: this.state.TermsConditionFlag==false ?'red':colors.greyDark}]}
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

const customstyle = StyleSheet.create({
  headerContainer: {
      flex: 1,
      paddingTop: 0,
      backgroundColor: 'yellow',

      justifyContent: 'space-around',
  },
  inputStyles: {
      height: 47, borderColor: "#A5A5A5", borderWidth: 1, paddingLeft: '3%'
  },
  checkbox: {
 
    fontSize: 17,
  },
});
