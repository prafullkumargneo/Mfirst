import {StyleSheet, Platform} from 'react-native';
import {standardPadding} from '../../../constants/globals';
import * as colors from '../../../constants/colors';
import * as globals from '../../../constants/globals';
import {Font} from '../../../constants/globals';

const style = StyleSheet.create({
  inputs: {
    // height: 120,
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    zIndex: 0,
  },
  inputError: {
    color: colors.red,
    fontSize: 11,
    textAlign: 'center',
    marginRight: 4,
  },
  inputItem: {
    width: 40,
    height: 50,
    borderRadius: 5,
    // borderColor: colors.primaryColor,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputItemText: {
    fontSize: 34,
    color: colors.primaryColor,
  },

  button: {
    width: '100%',
    marginVertical: standardPadding,
  },
  reset: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingTop: 10,
    alignItems: 'center',
  },
  resetBtnText: {
    color: colors.blue,
    fontSize: 15,
  },

  createAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    alignItems: 'center',
    paddingHorizontal: '7%',
  },
  createAccountBtnText: {
    color: colors.blue,
    fontSize: 15,
  },

  iconContainer: {
    marginLeft: 15,
    marginTop: 15,
    alignItems: 'flex-start',
    // backgroundColor: "red",
    width: 22,
  },
  iconLeft: {
    alignSelf: 'flex-start',
    color: colors.white,
  },
  alertPopupContent: {
    width: globals.deviceWidth - 20,
    paddingHorizontal: 10,
    zIndex: 200,
  },
  checkbox: {
    color: colors.greyDark,
    fontSize: 17,
  },
});

export default style;
