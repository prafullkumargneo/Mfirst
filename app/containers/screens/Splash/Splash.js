import React from 'react';
import {
  NativeModules,
  LayoutAnimation,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import _Text from 'module';
import Icon from '../../../assets/images/logo.png';
const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class SplashScreen extends React.Component {
  state = {
    w: 150,
    h: 150,
    isAnimationDone: false,
  };

  componentDidMount() {
    setTimeout(() => {
      LayoutAnimation.spring();
      this.setState({
        w: this.state.w + 15,
        h: this.state.h + 15,
        isAnimationDone: true,
      });
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Icon}
          style={[styles.box, {width: this.state.w, height: this.state.h}]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
  },
});
export default SplashScreen;
