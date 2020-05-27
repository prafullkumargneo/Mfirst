import {Text} from 'react-native';
import React from 'react';
import {Font} from '../../constants/globals';

export default class _Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, {fontFamily: Font[this.props.font]}]}>
        {this.props.children}
      </Text>
    );
  }
}

_Text.defaultProps = {
  font: 'ubuntuRegular',
};
