import React, {Component} from 'react';
import {
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

export default class TouchItem extends Component {
  renderiOS() {
    return (
      <TouchableOpacity
        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
        activeOpacity={this.props.noFeedback ? 1 : 0.6}
        {...this.props}>
        {this.props.children}
      </TouchableOpacity>
    );
  }

  renderAndroid() {
    let feedback = this.props.ripple
      ? TouchableNativeFeedback.Ripple(
          this.props.white ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)',
          true,
        )
      : TouchableNativeFeedback.SelectableBackground();
    return (
      <TouchableNativeFeedback
      disabled={this.props.disabled}
        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
        {...this.props}
        background={feedback}>
        <View {...this.props}>{this.props.children}</View>
      </TouchableNativeFeedback>
    );
  }

  renderNoFeedback() {
    return (
      <TouchableWithoutFeedback
        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
        {...this.props}>
        <View {...this.props}>{this.props.children}</View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return this.props.noFeedback || !this.props.onPress
      ? this.renderNoFeedback()
      : Platform.OS === 'ios'
      ? this.renderiOS()
      : this.renderAndroid();
  }
}

TouchItem.propTypes = {
  onPress: PropTypes.func,
  noFeedback: PropTypes.bool,
  ripple: PropTypes.bool,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
};

TouchItem.defaultProps = {
  noFeedback: false,
  ripple: false,
  white: false,
};
