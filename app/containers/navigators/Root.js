/* eslint-disable react/display-name */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Keyboard,
  Alert,
  AsyncStorage,
  StatusBar,
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import _TouchItem from '../../components/TouchItem/_TouchItem';
import NavService from './navigationService';
import MainDrawer from './MainDrawer/MainDrawer';
import OrderAccepted from '../screens/Order/acceptedOrder';
import Login from './Stack/LoginStack';
import LoginPhone from './Stack/LoginPhoneStack';
import DiscoverNavigator from './Stack/DiscoverStack';
import ProductDetails from '../screens/ProductDetails/productDetails';
import ShippingAddress from '../screens/Payment/ShippingAddress';
import ReviewOrder from '../screens/Order/reviewOrder';
import Orders from '../screens/Order/Orders';
import FavoriteOrders from '../screens/Order/favouritesOrder';
import CartNavigator from './Stack/CartStack';
import PaymentNavigator from './Stack/PaymentStack';
import GiftWrapping from '../screens/Cart/GiftWrapping';
import OrdersDetails from '../screens/Order/orderDetails';
import Search from '../screens/Search/search';
import SearchDetails from '../screens/Search/searchDetails';
import AppStack from './Stack/AppStack';
import HeaderMenu from './HeaderMenuButton';
import { white } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RootNavigation = createStackNavigator(
  {
    MainDrawer: {
      screen: () => (
        <MainDrawer ref={navRef => NavService.setNavigator(navRef, 'drawer')} />
      ),
      navigationOptions: {
        headerShown: false,
      },
    },

    Login: {
      screen: () => (
        <Login ref={nav => NavService.setNavigator(nav, 'login')} />
      ),
      navigationOptions: {
        headerShown: false,
      },
    },
    LoginPhone: {
      screen: () => (
        <LoginPhone ref={nav => NavService.setNavigator(nav, 'loginPhone')} />
      ),
      navigationOptions: {
        headerShown: false,
      },
    },
    DiscoverNavigator: {
      screen: () => (
        <DiscoverNavigator ref={nav => NavService.setNavigator(nav, 'discover')} />
      ),
      navigationOptions: {
        headerShown: false,
      },
    },
    Cart: {
      screen: () => (
        <CartNavigator ref={nav => NavService.setNavigator(nav, 'cart')} />
      ),
      navigationOptions: {
        // gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerTintColor: white,
        headerTitle: "Shopping Cart",
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        },
        // headerStyle: {
        //   shadowOpacity: 0,
        //   shadowOffset: {
        //     height: 0,
        //   },
        //   shadowRadius: 0,
        // },
      },
    },
    Payement: {
      screen: () => (
        <PaymentNavigator ref={nav => NavService.setNavigator(nav, 'payment')} />
      ),
      navigationOptions: {
        // gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerTintColor: white,
        headerTitle: "Payment Method",
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        },
        // headerStyle: {
        //   shadowOpacity: 0,
        //   shadowOffset: {
        //     height: 0,
        //   },
        //   shadowRadius: 0,
        // },
      },
    },
    GiftWrapping: {
      screen: GiftWrapping,
      navigationOptions: {
        // gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerTintColor: white,
        headerTitle: "Choose Gift Wrap",
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        },
        // headerStyle: {
        //   shadowOpacity: 0,
        //   shadowOffset: {
        //     height: 0,
        //   },
        //   shadowRadius: 0,
        // },
      },
    },
    ShippingAddress: {
      screen: ShippingAddress,
      navigationOptions: {
        // gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerTintColor: white,
        headerTitle: "Shipping Address",
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        },
        // headerStyle: {
        //   shadowOpacity: 0,
        //   shadowOffset: {
        //     height: 0,
        //   },
        //   shadowRadius: 0,
        // },
      },
    },
    ReviewOrder: {
      screen: ReviewOrder,
      navigationOptions: {
        // gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerTintColor: white,
        headerTitle: "Review Your Order",
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        },
         headerLeft: null
        // headerStyle: {
        //   shadowOpacity: 0,
        //   shadowOffset: {
        //     height: 0,
        //   },
        //   shadowRadius: 0,
        // },
      },
    },
    OrderAccepted: {
      screen: OrderAccepted,
      navigationOptions: {
        // gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerTintColor: white,
        headerTitle: "Thanku You",
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        },
         headerLeft: null
       
      },
    },
    Orders: {
      screen: Orders,
      navigationOptions: {
        // gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerTintColor: white,
        headerTitle: "My Orders",
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        }
       
      },
    },
    FavoriteOrders: {
      screen: FavoriteOrders,
      navigationOptions: {
        // gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerTintColor: white,
        headerTitle: "Favorites",
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        }
       
      },
    },
    
    OrdersDetails: {
      screen: OrdersDetails,
      navigationOptions: {
        // gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerTintColor: white,
        headerTitle: "Order Details",
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        }
         
      },
    },
    SearchBar: {
      screen: Search,
      navigationOptions: {
       
        headerTitle: false,
      
         
      },
    },
    SearchDetails: {
      screen: SearchDetails,
      navigationOptions: {
        headerShown: false
        
         
      },
    },
    
    ProductDetailsStack: {
      screen: ProductDetails,
      navigationOptions: {
        // gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerTintColor: white,
        headerRight: () => (
          <_TouchItem
            style={{ marginRight: 10, flexDirection: 'row' }}
            onPress={() => { NavService.navigate('root', 'Cart'); }}>
            <Icon
              name={'cart-outline'}
              color={'black'}
              size={22}
              style={{ marginRight: 5 }}
            />
          </_TouchItem>
        ),
        headerTitle: "Details",
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18
        },
        // headerStyle: {
        //   shadowOpacity: 0,
        //   shadowOffset: {
        //     height: 0,
        //   },
        //   shadowRadius: 0,
        // },
      },
    },
  }
);

export default createAppContainer(RootNavigation);
