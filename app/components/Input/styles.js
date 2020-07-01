import {StyleSheet, Platform} from 'react-native';
import {
  SMALL_DEVICE_H,
  SMALL_DEVICE_W,
  WINDOW,
  standardPadding,
} from '../../constants/globals';
import * as COLORS from '../../constants/colors';
import {Font} from '../../constants/globals';

const style = StyleSheet.create({
  wrapperStyle: {
    width: WINDOW.width - 2 * standardPadding,
    marginTop: 0,

    marginBottom: 5,
    alignSelf: 'center',
  },
  wrapperStyleCode: {
    width: 50,
    marginTop: 0,
    paddingBottom: 0,
    marginBottom: 10,
    alignSelf: 'center',
  },

  labelWrapper: {
    marginBottom: 5,
  },
  labelStyle: {
    // color: COLORS.primaryColor + 'AA',
    color: 'red',
    fontSize: 14,
    // fontWeight: '500',
    backgroundColor: 'transparent',
  },
  lightLabelStyle: {
    color: COLORS.grey,
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  labelError: {
    color: COLORS.red,
    fontSize: 15,
    backgroundColor: 'transparent',
    paddingRight: 0,
  },
  inputStyle: {
    backgroundColor: COLORS.white,
  },
  textInputStyle: {
    backgroundColor: 'transparent',
    color: COLORS.black,
    fontSize: 15,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    paddingRight: 14,
    paddingLeft: 14,
    zIndex: 5,
    fontFamily: Font.ubuntuRegular,
    flex: 1,
  },
  textInputStylePhone: {
    backgroundColor: 'transparent',
    color: COLORS.black,
    fontSize: 15,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    paddingRight: 14,
    paddingLeft: 14,
    zIndex: 5,
    fontFamily: Font.ubuntuRegular,
    flex: 1,
  },

  validatePositioning: {
    position: 'absolute',
    right: 0,
    bottom: 3,
  },
  rightIconPosition: {
    height: SMALL_DEVICE_H ? 20 : 30,
    width: SMALL_DEVICE_W ? 20 : 40,
    backgroundColor: 'transparent',
  },
  borderContainer: {
    borderWidth: 1,
    borderRadius: 3,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  borderContainerPhone: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  primaryBorder: {
    borderColor: COLORS.greyLight,
    zIndex: 1,
  },
  phoneBorder: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderBottomColor: COLORS.greyLight,
    borderBottomWidth: 4,
  },
  focusBorderPhone: {
    backgroundColor: COLORS.blueLight,
    borderBottomColor: COLORS.primaryColor,
    borderBottomWidth: 4,
    zIndex: 3,
  },
  errorBorderPhone: {
    borderBottomColor: COLORS.red,
    borderBottomWidth: 4,
    zIndex: 3,
  },
  validatedBorderPhone: {
    backgroundColor: COLORS.blueLight,
    borderBottomColor: COLORS.primaryColor,
    borderBottomWidth: 4,
    zIndex: 2,
  },
  focusBorder: {
    borderColor: COLORS.primaryColor,
    zIndex: 3,
  },
  errorBorder: {
    borderColor: COLORS.red,
    zIndex: 3,
  },
  validatedBorder: {
    borderColor: COLORS.greyLight,
    zIndex: 2,
  },
  disabled: {
    opacity: 0.25,
  },
  inputInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 20,
  },
  inputInnerContainerPhone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 20,
  },
  currencyLabel: {
    alignSelf: 'center',
    position: 'absolute',
    left: 10,
  },
});

export default style;
