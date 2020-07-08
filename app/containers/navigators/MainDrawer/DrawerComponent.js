import React, { PureComponent } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  FlatList, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import NavService from '../navigationService';

import { lightGrey, white, greyIcon } from '../../../constants/colors';
import * as menuList from '../../../constants/menu';

import { HEIGHT } from '../../../constants/dimensions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _Separator from '../../../components/Separator/_Separator';
import _MainMenu from '../../../components/Menu/_MainMenu';
import _SubMenu from '../../../components/Menu/_SubMenu';
import categoryDetails from '../../../actions/CategoriesActions/CategoryActions';
import { StackActions, NavigationActions, DrawerItems } from 'react-navigation';
import drawerProfile from '../../../actions/DrawerAction/drawerProfileAction';
let loggedInCredentials;
class DrawerComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSwitch: 1,
      loggedInCredentials: null
    };


  }

  someAction() {
    alert('Some action is called!');

  }


  componentWillUnmount() {
    this.reRenderSomething.remove();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    console.log("in drawer component will receive  props", nextProps.drawerProfileReducer, prevState)
    // return {
    //   cachedSomeProp: nextProps.someProp,
    //   // ... other derived state properties
    // };
  }

  componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
      //Put your code here you want to rerender, in my case i want to rerender the data 
      //im fetching from firebase and display the changes

      this.someAction();
      this.forceUpdate();
    });
    this.props.categoryDetails()
    AsyncStorage.getItem('LoggedInData').then(value => {
      if (value) {
        let objectvalue = JSON.parse(value)
        this.setState({ loggedInCredentials: objectvalue })
        console.log("async value", objectvalue)
      }
    });
  }

  logout() {
    let Logoutdata = {
      Data: null
    }
    this.props.drawerProfile(Logoutdata)
    this.setState({loggedInCredentials:null})
    AsyncStorage.clear()


  }

  _keyExtractor = (item, index) => item._id;

  renderCloseButton() {
    return (
      <View style={[styles.closeButton, { marginTop: StatusBar.currentHeight }]}>
        <_TouchItem onPress={this.props.navigation.toggleDrawer}>
          <Icon name="close" size={30} color="black" />
        </_TouchItem>
      </View>
    );
  }

  renderUser() {
    console.log("logincredentioal", loggedInCredentials,this.state.loggedInCredentials)
    if (this.state.loggedInCredentials || loggedInCredentials) {
      return (
        <View style={[styles.userHeaderContainer, { marginTop: 1, paddingVertical: "13%" }]}>

          <Text style={{ fontSize: 22, textAlign: "center", fontWeight: '700' }}>Hello, {loggedInCredentials ? loggedInCredentials.userName : this.state.loggedInCredentials.userName}</Text>

        </View>
      );
    }
    else {
      return (
        <View style={[styles.userHeaderContainer, { marginTop: 1 }]}>

          <_Button
            text="Sign In or Register"
            theme="primary"
            onPress={() => {
              // NavService.reset('root');
              NavService.navigate('root', 'Login');

            }}
            size="M"
          />
          <_Button
            text="Continue with your phone"
            theme="secondary"
            onPress={() => {
              // NavService.reset('root');
              NavService.navigate('root', 'LoginPhone');
            }}
            leftIcon
          />

        </View>
      );
    }
  }

  renderMainMenu() {
    const menu_list = menuList.mainMenu;
    return (
      <FlatList
        data={menu_list}
        renderItem={({ item, index }) => (
          <_MainMenu title={item.title} image_url={item.image} key={index} />
        )}
        ItemSeparatorComponent={() => <_Separator />}
      />
    );
  }

  renderSubMenu() {
    return (
      <View style={{ marginTop: 20 }}>
        <_SubMenu title={'Rate Us'} />
        <_SubMenu title={'Share this app'} />
        <_SubMenu
          switch
          swicthName={{ on: 'ARB', off: 'ENG' }}
          title={'Language'}
        />
        <_SubMenu
          switch
          swicthName={{ on: 'KWD', off: '$' }}
          title={'Currency'}
        />
      </View>
    );
  }

  renderAppSubMenu() {
    return (
      <View style={{ marginTop: 20 }}>
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
      <TouchableOpacity onPress={() => this.logout()} style={{ paddingHorizontal: "13%", backgroundColor: "transparent", paddingTop: "2%" }}>
        <Text style={{ fontSize: 16,color:'red' }}>Sign out</Text>
      </TouchableOpacity>
    );
  }

  render() {
    loggedInCredentials = this.props.drawerProfileReducer.drawerProfileData
    return (
      <View style={{ width: '100%', height: '100%' }}>
        {this.renderCloseButton()}
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={{ paddingBottom: 15 }}>
          <SafeAreaView>
            {this.renderUser()}
            <_Separator />
            {this.renderMainMenu()}
            <_Separator />
            {this.renderSubMenu()}
            {this.renderAppSubMenu()}
            {loggedInCredentials ? this.renderLogout():null}

            {/* <DrawerItems {...this.props} getLabel={this.renderMenuItem} /> */}
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    signInReducer: state.signInReducer,
    drawerProfileReducer: state.drawerProfileReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ categoryDetails, drawerProfile }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent)


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
