import React from 'react';
import {View, TextInput, Animated, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import _Text from '../../components/Text/_Text';

import _TouchItem from '../TouchItem/_TouchItem';
import {isEmpty} from '../../constants/globals';
import {formatMoney} from '../../lib/formatData';

import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconCom from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFea from 'react-native-vector-icons/Feather';

import * as colors from '../../constants/colors';
import style from './styles.js';

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: this.props.label,
      userError: this.props.userError,
      error: false,
      isFirstFill: true,
      resetKey: null,
      secureTextVisible: false,
      errorAnim: new Animated.Value(0),
      focusBorder: new Animated.Value(0),
      errorBorder: new Animated.Value(0),
      validatedBorder: new Animated.Value(0),
    };

    this.initialState = this.state;
  }

  componentWillReceiveProps(new_props) {
    if (this.props.format !== 'amount') {
      if (
        this.state.isFirstFill &&
        !this.textInput.isFocused() &&
        !isEmpty(new_props.text)
      ) {
        this.setState({
          isFirstFill: false,
        });
      }
    }
  }

  componentDidUpdate(newProps) {
    this.animateBorder();
  }

  rightIcon() {
    if (this.props.rightIcon !== null) {
      switch (this.props.iconLib) {
        case 'MaterialIcons':
          return (
            <IconMat name={this.props.rightIcon} style={this.props.iconStyle} />
          );
          break;
        case 'MaterialCommunityIcons':
          return (
            <IconCom name={this.props.rightIcon} style={this.props.iconStyle} />
          );
          break;
        case 'Fontello':
          return (
            <IconTello
              name={this.props.rightIcon}
              style={this.props.iconStyle}
            />
          );
          break;
        case 'Feather':
          return (
            <IconFea name={this.props.rightIcon} style={this.props.iconStyle} />
          );
          break;
        default:
          return <View />;
          break;
      }
    }
  }

  triggerError(error) {
    this.setState({
      error,
    });
    if (!error) {
      Animated.parallel([
        Animated.timing(this.state.errorAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      this.props.onChangeText(this.props.text);
    } else {
      Animated.parallel([
        Animated.timing(this.state.errorAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }

  formatNumber = n => {
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  formatter = input_val => {
    if (input_val === undefined) {
      return;
    }

    const decimal_pos = input_val.indexOf('.');
    if (decimal_pos >= 0) {
      let left_side = input_val.substring(0, decimal_pos);
      let right_side = input_val.substring(decimal_pos);
      left_side = this.formatNumber(left_side);
      right_side = this.formatNumber(right_side);
      right_side = right_side.substring(0, 2);
      input_val = left_side + '.' + right_side;
    } else {
      input_val = this.formatNumber(input_val);
    }
    return input_val;
  };

  amountBlur = () => {
    let input_val = this.props.text;
    if (input_val === '' || input_val === undefined) {
      return;
    }
    const decimal_pos = input_val.indexOf('.');
    const left_side = input_val.substring(0, decimal_pos);
    let right_side = input_val.substring(decimal_pos);
    if (decimal_pos >= 0) {
      right_side += '00';
      right_side = right_side.substring(0, 3);
      input_val = left_side + '.' + right_side;
    } else {
      input_val += '.00';
    }
    this.onChangeText(input_val);
  };

  onChangeText = t => {
    if (this.props.onChangeText) {
      let text = t;
      if (this.props.format === 'amount') {
        text = this.formatter(t);
        this.props.onChangeText(text);
      }
      this.props.onChangeText(text);
    } else {
      this.setState({
        text: t,
      });
    }
    this.check();
  };

  validate = silent => {
    var errorCounter = 0;
    if (this.props.validationMode !== undefined) {
      let validationModeArr = this.props.validationMode.split('|');
      validationModeArr.map(validationType => {
        if (this.validationSwitch(validationType)) {
          errorCounter++;
        }
      });
    } else if (this.validationSwitch('')) {
      errorCounter++;
    }

    if (!silent) {
      errorCounter > 0 ? this.triggerError(true) : this.triggerError(false);
    } else {
      return errorCounter;
    }
  };

  validationSwitch = validationType => {
    switch (validationType) {
      case 'len4':
        if (this.props.text.length !== 4) {
          this.setState({
            error: true,
            userError: this.buildError('4 digits required'),
          });
          return true;
        }
        break;
      case 'len6':
        if (this.props.text.length !== 6) {
          this.setState({
            error: true,
            userError: this.buildError('6 digits required'),
          });
          return true;
        }
        break;
      case 'len10':
        if (this.props.text.length !== 10) {
          this.setState({
            error: true,
            userError: this.buildError('10 digits required'),
          });
          return true;
        }
        break;
      case 'number':
        var number = /^(\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)*$/;
        if (!number.test(this.props.text) && this.props.text != '') {
          this.setState(
            {
              error: true,
              userError: this.buildError('Not a number'),
            },
            () => {},
          );
          return true;
        }
        break;
      case 'money':
        var money = /^(.?\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)*$/;
        if (!money.test(this.props.text) && this.props.text != '') {
          this.setState({
            error: true,
            userError: this.buildError('Not a money amount'),
          });
          return true;
        }
        break;
      case 'mail':
        var mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //this.props.isMailValid(mail.test(this.props.text));
        if (!mail.test(this.props.text)) {
          this.setState({
            error: true,
            userError: this.buildError('Valid Email required'),
          });
          return true;
        }
        break;
      case 'specialchar':
        const reg = /([A-Za-z0-9-]+)/;
        if (!reg.test(this.props.text)) {
          this.setState({
            error: true,
            userError: this.buildError('Not accept special characters'),
          });
          return true;
        }
        break;
      case 'phone':
        // var phone = /^(\+?)(\d+){10,13}/;      !phone.test(this.props.text)
        var phone = this.props.text.startsWith('971')
          ? /^(\+?)(\d){11,13}$/
          : /^(\+?)(\d){13}$/;
        if (!phone.test(this.props.text)) {
          this.setState({
            error: true,
            userError: this.buildError('Not a valid phone number'),
          });
          return true;
        }
        break;

      case 'opt':
        this.setState({error: false});
        return false;
        break;
      case 'req':
        if (
          this.props.text.length < 10 &&
          this.props.label === 'Enter Destination Account' &&
          this.state.focused === false
        ) {
          this.setState({
            error: true,
            userError: this.buildError('Cannot be less 10'),
          });
          return true;
        }
        if (this.props.text.length === 0) {
          this.setState({
            error: true,
            userError: this.buildError('Cannot be empty'),
          });
          return true;
        }

        return false;
        break;
      case 'custom':
        var response = this.props.customInputValidation(this.props.text);
        if (response.state) {
          this.setState({
            error: true,
            userError: this.buildError(response.message),
          });
          return true;
        }
        return false;
        break;
      default:
        if (this.props.text.length === 0) {
          this.setState({
            error: true,
            userError: this.buildError('Cannot be empty'),
          });
          return true;
        }

        this.setState({
          error: false,
          userError: '',
        });
        return false;
        break;
    }
  };

  buildError = error => {
    return this.state.userError != ''
      ? this.state.userError + ' & ' + error
      : error;
  };

  reset() {
    this.textInput.clear();
    this.setState(this.initialState);
  }

  onBlur() {
    if (this.props.format === 'amount') {
      this.amountBlur();
    }
    this.check();
    this.setState({focused: false});
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  check = () => {
    if (this.props.noCheck) {
      return;
    }
    this.setState(
      {
        error: false,
        userError: '',
      },
      () => {
        if (this.props.validateFn) {
          this.props.onChangeText(this.props.text);
          setTimeout(() => {
            let userError = this.props.validateFn();
            if (userError == 'success') {
              this.validate();
            } else {
              this.setState(
                {
                  userError: userError,
                  error: true,
                },
                () => {
                  this.triggerError(true);
                  this.props.onChangeText('');
                },
              );
            }
          }, 200);
        } else {
          this.validate();
        }
      },
    );
  };

  renderRightIcon() {
    //console.log('Right Icon ', this.props.secureTextEntry);
    // if (this.props.currency !== null) {
    //   const currency = formatMoney(null, 2, this.props.currency);
    //   return <_Text style={style.currencyLabel}>{currency}</_Text>;
    // }
    if (
      this.props.secureTextEntry &&
      this.props.text &&
      this.props.text.length
    ) {
      return (
        <View style={{paddingRight: 15, zIndex: 20}}>
          <_TouchItem
            ripple
            onPress={() =>
              this.setState({
                secureTextVisible: !this.state.secureTextVisible,
              })
            }>
            {this.state.secureTextVisible ? (
              <IconFea
                name="eye-off"
                size={20}
                style={{
                  color: colors.greyLight,
                }}
              />
            ) : (
              <IconFea
                name="eye"
                size={20}
                style={{
                  color: colors.greyLight,
                }}
              />
            )}
          </_TouchItem>
        </View>
      );
    }

    if (this.props.rightIcon) {
      return (
        <View
          style={[
            style.rightIconPosition,
            {opacity: this.props.rightIcon ? 1 : 0},
          ]}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={this.props.onClickRightIcon}>
            <_Text style={{textAlign: 'right'}}>{this.rightIcon()}</_Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  checkValidation = () => {
    let errorCount = this.validate(true);
    this.check();
    return errorCount;
  };

  focusInput = () => {
    this.textInput.focus();
  };

  animateBorder() {
    Animated.parallel([
      Animated.timing(this.state.focusBorder, {
        toValue: this.state.focused ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.errorBorder, {
        toValue: this.state.error ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.validatedBorder, {
        toValue: !this.state.error && !this.state.isFirstFill ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    return (
      <View
        style={this.props.code ? style.wrapperStyleCode : style.wrapperStyle}
        key={this.state.resetKey}>
        <View style={style.labelWrapper}>
          <_Text
            style={
              this.props.theme === 'primary'
                ? style.lightLabelStyle
                : style.labelStyle
            }>
            {this.props.label}
          </_Text>
        </View>
        <View style={style.inputStyle}>
          <View style={{width: '100%'}}>
            <View
              style={[
                this.props.theme === 'primary'
                  ? style.borderContainer
                  : style.borderContainerPhone,
                this.props.theme === 'primary'
                  ? style.primaryBorder
                  : style.phoneBorder,
              ]}
            />
            <Animated.View
              style={[
                this.props.theme === 'primary'
                  ? style.borderContainer
                  : style.borderContainerPhone,
                this.props.theme === 'primary'
                  ? style.focusBorder
                  : style.focusBorderPhone,
                {opacity: this.state.focusBorder},
              ]}
            />
            <Animated.View
              style={[
                this.props.theme === 'primary'
                  ? style.borderContainer
                  : style.borderContainerPhone,
                this.props.theme === 'primary'
                  ? style.errorBorder
                  : style.errorBorderPhone,
                {opacity: this.state.errorBorder},
              ]}
            />
            <Animated.View
              style={[
                this.props.theme === 'primary'
                  ? style.borderContainer
                  : style.borderContainerPhone,
                this.props.theme === 'primary'
                  ? style.validatedBorder
                  : style.validatedBorderPhone,
                {opacity: this.state.validatedBorder},
              ]}
            />
            <View
              style={[
                this.props.theme === 'primary'
                  ? style.inputInnerContainer
                  : style.inputInnerContainerPhone,
              ]}
              removeClippedSubviews={false}>
              <TextInput
                {...this.props}
                ref={ti => {
                  this.textInput = ti;
                }}
                style={[
                  this.props.theme === 'primary'
                    ? style.textInputStyle
                    : style.textInputStylePhone,
                  this.props.textStyle,
                  {
                    paddingLeft: this.props.currency ? 28 : 14,
                    paddingTop: 14,
                  },
                ]}
                value={this.props.text}
                secureTextEntry={
                  this.props.secureTextEntry
                    ? !this.state.secureTextVisible
                    : false
                }
                onFocus={() => this.setState({focused: true})}
                onBlur={this.onBlur.bind(this)}
                onChangeText={this.onChangeText}
                maxLength={this.props.maxLength}
                underlineColorAndroid="transparent"
                spellCheck={false}
                contextMenuHidden={true}
              />
              {this.renderRightIcon()}
            </View>
          </View>
          <Animated.View
            style={[
              {
                opacity: this.state.errorAnim,
                bottom: -25,
                position: 'absolute',
                useNativeDriver: true,
              },
            ]}>
            <_Text style={style.labelError}>
              {this.props.code ? '' : this.state.userError}
            </_Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  label: PropTypes.string,
  userError: PropTypes.string,
  placeholder: PropTypes.string,
  iconLib: PropTypes.string,
  rightIcon: PropTypes.string,
  format: PropTypes.string,
  iconStyle: PropTypes.object,
  maxLength: PropTypes.number,
  validationMode: PropTypes.string,
  validateFn: PropTypes.func,
  customInputValidation: PropTypes.func,
  theme: PropTypes.string,
  onBlur: PropTypes.func,
  noCheck: PropTypes.bool,
  currency: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  textStyle: PropTypes.object,
};

Input.defaultProps = {
  iconStyle: style.iconStyle,
  theme: 'dark',
  maxLength: 40,
  currency: false,
  noCheck: false,
};
// backgroundColor: "rgb(96,118,151)"
