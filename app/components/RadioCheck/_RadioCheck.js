import React, {Component} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import _Text from '../Text/_Text';

import styles from './styles';

import * as image_url from '../../assets/images/map';
import * as COLORS from '../../constants/colors';

class RadioCheck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: !!props.checked,
      label: props.label,
      label_style: props.labelStyle,
      check_color: props.checkColor,
      check_size: props.checkSize,
      check_tap_opacity: props.checkTapOpacity,
      check_margin_right: props.checkMarginRight,
      check_hit_slop: props.checkHitSlop,
    };

    this.toggleCheck = this.toggleCheck.bind(this);
  }

  componentWillReceiveProps(new_props) {
    this.setState({
      checked: new_props.checked,
    });
  }

  toggleCheck() {
    this.setState(
      {
        checked: !this.state.checked,
      },
      () => {
        if (typeof this.props.onToggleCheck == 'function') {
          this.props.onToggleCheck(this.state.checked);
        }
      },
    );
  }

  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <TouchableOpacity
          onPress={() => {
            this.props.disable ? {} : this.toggleCheck();
          }}
          activeOpacity={this.state.check_tap_opacity}
          hitSlop={this.state.check_hit_slop}>
          {this.state.checked ? (
            <View style={{paddingRight: 10, zIndex: 20}}>
              <Image
                style={styles.imageIcon}
                source={image_url.checkbox.selected.l}
              />
            </View>
          ) : (
            <View style={{paddingRight: 10, zIndex: 20}}>
              <Image
                style={styles.imageIcon}
                source={image_url.checkbox.unselected.l}
              />
            </View>
          )}
        </TouchableOpacity>
        <_Text
          style={[this.state.label_style, {alignSelf: 'center'}]}
          font={this.props.font}>
          {this.state.label}
        </_Text>
      </View>
    );
  }
}

export default RadioCheck;

RadioCheck.propTypes = {
  onToggleCheck: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  checkColor: PropTypes.string,
  checkSize: PropTypes.number,
  checkTapOpacity: PropTypes.number,
  checkMarginRight: PropTypes.number,
  checkHitSlop: PropTypes.object,
  font: PropTypes.string,
};

RadioCheck.defaultProps = {
  label: 'Label Undefined',
  labelStyle: styles.label,
  font: 'R',
  checkColor: COLORS.text,
  checkSize: 25,
  checkTapOpacity: 1,
  checkMarginRight: 10,
  checkHitSlop: {top: 10, left: 10, bottom: 10, right: 10},
};
