import {StyleSheet} from 'react-native';
import {WINDOW, standardPadding} from '../../constants/globals';

export default (styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    alignSelf: 'center',
    paddingVertical: 12,

    width: WINDOW.width - 2 * standardPadding - 30,
  },
  text: {
    fontSize: 15,
    // fontWeight: '600',
    // fontFamily: Font.ubuntuBold,
    padding: 0,
    textAlign: 'center',
    letterSpacing: 1.2,
  },

  halfButton: {
    width: '47%',
  },

  imageIcon: {
    width: 10,
    height: 20,
    resizeMode: 'stretch',
  },
}));
