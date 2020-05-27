import {StyleSheet, Platform} from 'react-native';
import {standardPadding} from './globals';
import * as colors from './colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: standardPadding
  },
  primaryColorContainer: {
    flex: 1,
    // backgroundColor: colors.primaryColor,
    // padding: standardPadding
  },
  standardPadding: {
    padding: standardPadding,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  shadow: {
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    backgroundColor: 'white',
    elevation: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemsContainerStyle: {
    // padding: 18
  },
  labelStyle: {
    fontWeight: '400',
    margin: 8,
  },
});

export default style;
