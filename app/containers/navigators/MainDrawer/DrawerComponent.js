import React, {PureComponent} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  FlatList,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {DrawerItems} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import NavService from '../navigationService';

import {lightGrey, white, greyIcon} from '../../../constants/colors';
import * as menuList from '../../../constants/menu';

import {HEIGHT} from '../../../constants/dimensions';

import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _Separator from '../../../components/Separator/_Separator';
import _MainMenu from '../../../components/Menu/_MainMenu';
import _SubMenu from '../../../components/Menu/_SubMenu';

class DrawerComponent extends PureComponent {
  constructor() {
    super();
    this.state = {
      activeSwitch: 1,
    };
  }

  logout = () => {};

  _keyExtractor = (item, index) => item._id;
  
  renderCloseButton() {
    return (
      <View style={[styles.closeButton, {marginTop: StatusBar.currentHeight}]}>
        <_TouchItem onPress={this.props.navigation.toggleDrawer}>
          <Icon name="close" size={30} color="black" />
        </_TouchItem>
      </View>
    );
  }

  renderUser() {
    return (
      <View style={[styles.userHeaderContainer, {marginTop: 1}]}>
        <_Button
          text="Sign In or Register"
          theme="primary"
          onPress={() => {
            NavService.reset('root');
            NavService.navigate('root', 'Login');
          }}
          size="M"
        />
        <_Button
          text="Continue with your phone"
          theme="secondary"
          onPress={() => {
            NavService.reset('root');
            NavService.navigate('root', 'LoginPhone');
          }}
          leftIcon
        />
      </View>
    );
  }

  renderMainMenu() {
    const menu_list = menuList.mainMenu;
    return (
      <FlatList
        data={menu_list}
        renderItem={({item, index}) => (
          <_MainMenu title={item.title} image_url={item.image} key={index} />
        )}
        ItemSeparatorComponent={() => <_Separator />}
      />
    );
  }

  renderSubMenu() {
    return (
      <View style={{marginTop: 20}}>
        <_SubMenu title={'Rate Us'} />
        <_SubMenu title={'Share this app'} />
        <_SubMenu
          switch
          swicthName={{on: 'ARB', off: 'ENG'}}
          title={'Language'}
        />
        <_SubMenu
          switch
          swicthName={{on: 'KWD', off: '$'}}
          title={'Currency'}
        />
      </View>
    );
  }

  renderAppSubMenu() {
    return (
      <View style={{marginTop: 20}}>
        <_SubMenu title={'About'} heading />
        <_SubMenu title={'About Us'} />
        <_SubMenu title={'Refund Policy'} />
        <_SubMenu title={'Pravacy Policy'} />
        <_SubMenu title={'Terms & conditions'} />
        <_SubMenu title={'Support'} />
      </View>
    );
  }
  renderLogout() {
    return (
      <_TouchItem
        style={[
          styles.navItem,
          {
            backgroundColor: 'rgba(255,255,255,0.25)',
            borderTopColor: white,
            borderTopWidth: 2,
            paddingBottom: 20,
          },
        ]}
        onPress={this.logout}>
        <View style={styles.iconTextContainer}>
          <_Text weight="medium" style={[styles.navText, {color: white}]}>
            Logout
          </_Text>
        </View>
      </_TouchItem>
    );
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        {this.renderCloseButton()}
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={{paddingBottom: 15}}>
          <SafeAreaView>
            {this.renderUser()}
            <_Separator />
            {this.renderMainMenu()}
            <_Separator />
            {this.renderSubMenu()}
            {this.renderAppSubMenu()}

            {/* <DrawerItems {...this.props} getLabel={this.renderMenuItem} /> */}
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

export default DrawerComponent;

const styles = StyleSheet.create({
  closeButton: {
    flexDirection: 'row-reverse',
    margin: 10,
  },
  userHeaderContainer: {
    padding: 20,
  },
  navItem: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    fontSize: 20,
  },
  iconTextContainer: {
    margin: 10,
    paddingLeft: 20,
  },
});
