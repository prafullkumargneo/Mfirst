import {Dimensions, Platform, StatusBar} from 'react-native';
// import {checkInputValidation, excludeAccounts} from './helpers';
import DeviceInfo from 'react-native-device-info';
import {primaryColor} from './colors';

export const APP_VERSION = '1.0.0.0';
export const WINDOW = Dimensions.get('window');
export const deviceWidth = WINDOW.width;
export const deviceHeight = WINDOW.height;
export const SMALL_DEVICE_H = WINDOW.height < 600 ? true : false;
export const TIMEOUT = 1000 * 120;
export const OS = Platform.OS;

export const isEmptyObject = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const standardPadding = 20;

exports.globalVars = {
  touchidInitiated: '',
  touchidEnabled: '',
  biometryType: '',
};

export const Font = {
  ubuntuBold: 'Ubuntu-Bold',
  ubuntuBoldItalic: 'Ubuntu-BoldItalic',
  ubuntuItalic: 'Ubuntu-Italic',
  ubuntuLight: 'Ubuntu-Light',
  ubuntuLightItalic: 'Ubuntu-LightItalic',
  ubuntuMedium: 'Ubuntu-Medium',
  ubuntuMediumItalic: 'Ubuntu-MediumItalic',
  ubuntuRegular: 'Ubuntu',
};

export const isEmpty = t => {
  if (typeof t !== 'string') {
    if (!t) {
      return true;
    }
    throw new TypeError(
      `globals.isEmpty: param must be a string, was: ${typeof t}`,
    );
  }
  return t.length === 0;
};

export const location = {};

export const sessionID = null;

export const headerStyles = {
  backgroundColor: primaryColor,
  ...Platform.select({
    android: {
      paddingTop: StatusBar.currentHeight,
      height: 56 + StatusBar.currentHeight,
    },
  }),
};

export const deviceModel = DeviceInfo.getModel();
export const deviceName = DeviceInfo.getDeviceName();
// export const deviceID = DeviceInfo.getUniqueID();
// navigator.geolocation.getCurrentPosition(
//   position => {
//     location.latitude = position.coords.latitude;
//     location.longitude = position.coords.longitude;
//   },
//   error => {},
//   {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
// );
