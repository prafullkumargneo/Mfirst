import React from 'react';
import {View, TextInput, Animated, TouchableOpacity, Text} from 'react-native';

import _Text from '../../components/Text/_Text';

import _TouchItem from '../TouchItem/_TouchItem';
import {isEmpty} from '../../constants/globals';
import {formatMoney} from '../../lib/formatData';

import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconCom from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFea from 'react-native-vector-icons/Feather';

import * as colors from '../../constants/colors';
import style from './styles.js';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: this.props.label,
      userError: this.props.userError,
      error: false,
      isFirstFill: true,
      resetKey: null,
      secureTextVisible: false,
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
    //this.animateBorder();
  }

  rightIcon() {
    return <IconMat name={this.props.rightIcon} style={this.props.iconStyle} />;
  }

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

  validate = silent => {};

  reset() {
    this.textInput.clear();
    this.setState(this.initialState);
  }

  onBlur() {}

  renderRightIcon() {
    //console.log('Right Icon ', this.props.secureTextEntry);
    // if (this.props.currency !== null) {
    //   const currency = formatMoney(null, 2, this.props.currency);
    //   return <_Text style={style.currencyLabel}>{currency}</_Text>;
    // }

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
    // let errorCount = this.validate(true);
    // this.check();
    // return errorCount;
  };

  focusInput = () => {
    this.textInput.focus();
  };

  render() {
    return (
      <View style={style.wrapperStyle} key={this.state.resetKey}>
        <View style={style.inputStyle}>
          <View style={{width: '100%'}}>
            <View style={[style.borderContainer, style.primaryBorder]} />

            <View
              style={style.inputInnerContainer}
              removeClippedSubviews={false}>
              <TextInput
                {...this.props}
                ref={ti => {
                  this.textInput = ti;
                }}
                style={[
                  style.textInputStyle,
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
        </View>
      </View>
    );
  }
}

// backgroundColor: "rgb(96,118,151)"
