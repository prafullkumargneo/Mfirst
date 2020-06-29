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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // paddingBottom: 15,
    // paddingTop: 10,
    // alignItems: 'center',
    
  },
  resetBtnText: {
    color: colors.blue,
    fontSize: 13.5,
    textDecorationLine:"underline"
  },

  createAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: "10%",
    paddingTop: 5,
    alignItems: 'center',
    paddingHorizontal: '7%'
  },
  createAccountBtnText: {
    color: colors.blue,
    fontSize: 13.5,
    textDecorationLine:"underline"
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
  phoneVerificationNotice: {
    marginTop: 10,
    color: colors.blackLight,
    fontSize: 15,
  },
  phoneTitle: {
    color: colors.blackLight,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
  },
  phoneContainer: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeContainer: {
    margin: 10,
    padding: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
});

export default style;
