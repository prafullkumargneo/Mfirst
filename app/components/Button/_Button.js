import React, {Component} from 'react';
import {ActivityIndicator, Platform, Image, View} from 'react-native';
import PropTypes from 'prop-types';
import _Text from '../../components/Text/_Text';
import * as colors from '../../constants/colors';
import * as image_url from '../../assets/images/map';
import _TouchItem from '../TouchItem/_TouchItem';
import styles from './styles';

export default class Button extends Component {
  renderContent() {
    if (this.props.loading) {
      return (
        <ActivityIndicator
          style={{height: Platform.OS === 'ios' ? 19 : 19}}
          color={
            this.props.theme === 'light' ? colors.secondaryColor : colors.white
          }
        />
      );
    } else {
      return (
        <_Text
          font={'ubuntuBold'}
          style={[
            styles.text,
            {
              color:
                this.props.theme === 'primary'
                  ? colors.white
                  : this.props.theme === 'secondary'
                  ? colors.blue
                  : colors.white,
            },
          ]}>
          {this.props.text}
        </_Text>
      );
    }
  }

  renderIcon() {
    if (this.props.leftIcon) {
      return (
        <View style={{paddingRight: 20, zIndex: 20}}>
          <Image style={styles.imageIcon} source={image_url.mobile.l} />
        </View>
      );
    }
  }
  render() {
    let color;
    let border = {};
    switch (this.props.theme) {
      case 'primary':
        color = colors.primaryColor;
        border = {
          borderColor: colors.primaryColor,
          borderWidth: 2,
        };
        break;

      case 'secondary':
        color = 'transparent';
        border = {
          borderColor: colors.blue,
          borderWidth: 2,
        };
        break;
      default:
        color = colors.primaryColor;
        break;
    }
    return (
      <_TouchItem
        activeOpacity={0.6}
        onPress={() => {
          !this.props.loading ? this.props.onPress() : '';
        }}
        style={[
          styles.button,
          this.props.halfButton ? styles.halfButton : null,
          {backgroundColor: color, marginBottom: this.props.noMargin ? 0 : 20},
          border,
        ]}>
        {this.renderIcon()}
        {this.renderContent()}
      </_TouchItem>
    );
  }
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string,
  theme: PropTypes.string,
  halfButton: PropTypes.bool,
  noMargin: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  text: 'CONTINUE',
  theme: 'blue',
  noCaps: false,
  halfButton: false,
  noMargin: false,
  loading: false,
};
