import React, {Component} from 'react';
import {View} from 'react-native';

import SwitchButton from './_Switch';
import {primaryColor} from '../../constants/colors';
export default class Switch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSwitch: 1,
    };
  }

  render() {
    return (
      <View>
        <SwitchButton
          onValueChange={val => this.setState({activeSwitch: val})} // this is necessary for this component
          text1={this.props.on} // optional: first text in switch button --- default ON
          text2={this.props.off} // optional: second text in switch button --- default OFF
          switchWidth={120} // optional: switch width --- default 44
          switchHeight={40} // optional: switch height --- default 100
          switchdirection="rtl" // optional: switch button direction ( ltr and rtl ) --- default ltr
          switchBorderRadius={100} // optional: switch border radius --- default oval
          switchSpeedChange={500} // optional: button change speed --- default 100
          switchBorderColor={primaryColor} // optional: switch border color --- default #d4d4d4
          switchBackgroundColor="#fff" // optional: switch background color --- default #fff
          btnBorderColor={primaryColor} // optional: button border color --- default #00a4b9
          btnBackgroundColor="#00bcd4" // optional: button background color --- default #00bcd4
          fontColor={primaryColor} // optional: text font color --- default #b1b1b1
          activeFontColor="#fff" // optional: active font color --- default #fff
        />
        {this.state.activeSwitch === 1
          ? console.log('view1')
          : console.log('view2')}
      </View>
    );
  }
}
