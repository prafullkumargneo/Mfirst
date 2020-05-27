import {StyleSheet} from 'react-native';
import {lightGrey} from '../../constants/colors';

const styles = StyleSheet.create({
  closeButton: {
    flexDirection: 'row-reverse',
    margin: 10,
  },
  navItem: {
    paddingHorizontal: 20,
    paddingTop: 17,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItemIcon: {
    fontSize: 18,
    marginRight: 20,
  },
  navText: {
    fontSize: 20,
  },

  mainNavItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  mainNavItemIcon: {
    flex: 1,
    alignItems: 'flex-end',
  },
  mainNavText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: lightGrey,
  },
  mainNavIcon: {
    fontSize: 30,
  },
  iconTextContainer: {
    margin: 10,
    paddingLeft: 20,
  },
});

export default styles;
