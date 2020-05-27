import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
  PanResponder,
} from 'react-native';

import _TouchItem from '../TouchItem/_TouchItem';
import _Text from '../Text/_Text';
import _Switch from '../Switch/index';
export default class SubMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let Container = _TouchItem;
    if (this.props.heading || this.props.switch) {
      Container = View;
    }
    return (
      <Container style={styles.subMenuContainer} onPress={() => {}}>
        <View
          style={{
            zIndex: 20,
          }}
        />
        <View style={styles.subMenuTextContainer}>
          <_Text
            style={[styles.subMenuText, this.props.heading ? styles.bold : '']}
            weight="medium">
            {this.props.title}
          </_Text>
        </View>

        <View style={styles.subMenuSwitchContainer}>
          {this.props.switch ? (
            <_Switch
              on={this.props.swicthName.on}
              off={this.props.swicthName.off}
            />
          ) : (
            <View style={{height: 35}} />
          )}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  subMenuContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subMenuTextContainer: {
    margin: 5,
    paddingLeft: 40,
  },
  subMenuText: {
    fontSize: 16,
    color: 'black',
  },
  subMenuSwitchContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20,
    margin: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});
