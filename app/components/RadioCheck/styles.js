import {StyleSheet} from 'react-native';
import * as COLORS from '../../constants/colors';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  label: {
    color: COLORS.black,
    fontSize: 17,
  },

  imageIcon: {
    width: 20,
    height: 20,
    resizeMode: 'stretch',
  },
  checkbox: {},
});

export default styles;
