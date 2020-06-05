import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Alert,
  AsyncStorage,
  StatusBar,
  ScrollView,
  FlatList, Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from 'react-navigation-drawer';
import _Input from '../../../components/Input/_Input';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _Header from '../../../components/Header/_MainHeader';
import { deviceWidth, deviceHeight } from '../../../constants/globals';
import DummyJSON from "../../../lib/dummyJson";
import appStyles from '../../../constants/appStyle';
import NavService from '../../navigators/navigationService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DeliveryIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import { RNToasty } from 'react-native-toasty';

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productQuantity: 1
    };
  }



  increaseProduct() {
    this.setState({ productQuantity: this.state.productQuantity + 1 })
  }

  decreaseProduct() {
    if (this.state.productQuantity <= 1) {
      RNToasty.Error({
        title: "Item Should not be less than 1.",
        titleSize: 15
      })
    }
    else {
      this.setState({ productQuantity: this.state.productQuantity <= 1 ? 1 : this.state.productQuantity - 1 })
    }

  }

  checkoutCart(){
    NavService.navigate('root','ShippingAddress')
  }

  render() {
    console.log("product quantity increase", this.state.productQuantity)
    return (
      <ScrollView contentContainerStyle={{ height: deviceHeight, width: deviceWidth, backgroundColor: "white" }}>

        <View style={{ backgroundColor: "white", paddingHorizontal: deviceWidth * 0.07, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ paddingVertical: deviceHeight * 0.02, fontSize: 16, color: "#2C2C2C" }}>Total <Text style={{ fontSize: 20, fontWeight: "bold", color: "#003351" }}>77.500 KWD</Text></Text>

          <TouchableOpacity onPress={()=>this.checkoutCart()} style={{ backgroundColor: "#3FC1C9", height: deviceHeight * 0.05, width: deviceWidth * 0.7, alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
            <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Checkout</Text>
          </TouchableOpacity>
          <View style={{ backgroundColor: "transparent", flexDirection: "row", paddingVertical: deviceHeight * 0.011 }}>
            <DeliveryIcon name={"truck-fast"} size={40} color={"#00333A"} />

            <Text style={{ paddingHorizontal: deviceWidth * 0.05, paddingTop: "3%" }}>Fast Delivery within 4 hrs</Text>
          </View>
        </View>

        <View style={{ backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.07, borderWidth: 0.5, borderColor: "#A5A5A5" }}>

          <View style={{ paddingVertical: deviceHeight * 0.04, backgroundColor: "transparent", flexDirection: "row" }}>

            <View style={{ backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.02 }}>
              <Image style={{ height: 97, width: 97 }} source={{ uri: "https://picsum.photos/200" }} />
            </View>
            <View style={{ backgroundColor: "transparent", paddingLeft: deviceWidth * 0.04 }}>

              <Text style={{ color: "#2B2B2B", fontSize: 14, fontWeight: "700" }}>Electric pump and pool</Text>
              <Text style={{ color: "#2B2B2B", fontSize: 14 }}>Electric pump and pool detail</Text>
              <Text style={{ fontSize: 16, paddingTop: "8%", color: "#003351", fontWeight: "bold" }}>3000 KWD</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#A5A5A5", fontSize: 13, textDecorationLine: "line-through" }}>4400 KWD  </Text>
                <Text style={{ color: "#3FC1C9", fontSize: 13 }}>30% OFF</Text>
              </View>

            </View>

          </View>

          <View style={{ paddingBottom: deviceHeight * 0.023, backgroundColor: "transparent", flexDirection: "row" }}>

            <View style={{ backgroundColor: "transparent", flexDirection: "row", flex: 0.95, }}>
              <TouchableOpacity onPress={() => { this.decreaseProduct() }} style={{ backgroundColor: "white", borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderColor: "#CCCCCC", borderWidth: 1, paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceHeight * 0.01 }}>
                <Text style={{ color: "#A5A5A5", fontSize: 13, fontWeight: "700" }}>-</Text>
              </TouchableOpacity>

              <View style={{ backgroundColor: "white", paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceHeight * 0.01, borderColor: "#CCCCCC", borderWidth: 1, paddingBottom: 1 }}>
                <Text>{this.state.productQuantity}</Text>
              </View>

              <TouchableOpacity onPress={() => { this.increaseProduct() }} style={{ backgroundColor: "white", borderTopRightRadius: 20, borderColor: "#CCCCCC", borderWidth: 1, borderBottomRightRadius: 20, paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceHeight * 0.01 }}>
                <Text style={{ color: "#003351", fontSize: 13, fontWeight: "700" }}>+</Text>

              </TouchableOpacity>

            </View>

            <View style={{ backgroundColor: "white", justifyContent: "center" }}>
              <Text style={{ textDecorationLine: "underline", fontSize: 13, color: "#003351", fontWeight: "700" }}>Remove</Text>
            </View>

          </View>

        </View>

        <View style={{ backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.07, paddingVertical: deviceHeight * 0.03, borderWidth: 0.5, borderColor: "#A5A5A5" }}>
          <View style={{ paddingVertical: deviceHeight * 0.03, backgroundColor: "transparent" }}>
            <TouchableOpacity onPress={() => { NavService.navigate('root', 'GiftWrapping'); }} style={{ flexDirection: "row", backgroundColor: "transparent", alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.01, borderWidth: 1.5, borderColor: "#003A51" }}>
              <Icon name={"gift"} size={26} color={"#003A51"} />
              <Text style={{ fontSize: 15, color: "#003A51", fontWeight: "700" }}>   Modify Gift Wrapping</Text>
            </TouchableOpacity>
          </View>


          <View style={{ flexDirection: "row" }}>
            <View style={{ backgroundColor: "transparent", flexDirection: "row", paddingHorizontal: deviceWidth * 0.03 }}>
              <Icon name={"hearto"} size={18} />
              <Text style={{ paddingHorizontal: deviceWidth * 0.02, color: "#003351", fontSize: 13, textDecorationLine: "underline", fontWeight: "700" }}>Add from favourties</Text>

            </View>

            <View style={{ backgroundColor: "transparent", flexDirection: "row", paddingHorizontal: deviceWidth * 0.07 }}>
              <Icon name={"copy1"} size={18} />
              <Text style={{ paddingHorizontal: deviceWidth * 0.02, color: "#003351", fontSize: 13, textDecorationLine: "underline", fontWeight: "700" }} >Add from orders</Text>
            </View>
          </View>

        </View>

        <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.03, paddingHorizontal: deviceWidth * 0.04, borderBottomWidth: 0.5, borderColor: "#A5A5A5" }} >

          <View style={{ flexDirection: "row", backgroundColor: "transparent", paddingVertical: deviceHeight * 0.015 }}>
            <View style={{ flex: 0.5, backgroundColor: "transparent" }}>
              <Text style={{ fontSize: 14, color: "#2B2B2B", fontWeight: "700" }}>Shipping</Text>
            </View>
            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
              <Text style={{ fontSize: 14, color: "#2B2B2B", fontWeight: "700" }}>77.500 KWD</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", backgroundColor: "transparent", paddingVertical: deviceHeight * 0.015 }}>
            <View style={{ flex: 0.5, backgroundColor: "transparent" }}>
              <Text style={{ fontSize: 14, color: "#2B2B2B", fontWeight: "700" }} >Discount</Text>
            </View>
            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
              <Text style={{ fontSize: 14, color: "#2B2B2B", fontWeight: "700" }}>77.500 KWD</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", backgroundColor: "transparent", paddingVertical: deviceHeight * 0.015 }}>
            <View style={{ flex: 0.5, backgroundColor: "transparent" }}>
              <Text style={{ fontSize: 14, color: "#2B2B2B", fontWeight: "700" }}>Tax</Text>
            </View>
            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
              <Text style={{ fontSize: 14, color: "#2B2B2B", fontWeight: "700" }}>0 KWD</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", backgroundColor: "transparent", paddingVertical: deviceHeight * 0.015 }}>
            <View style={{ flex: 0.5, backgroundColor: "transparent" }}>
              <Text style={{ fontSize: 14, color: "#2B2B2B", fontWeight: "700" }}>Total</Text>
            </View>
            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
              <Text style={{ fontSize: 20, color: "#003351", fontWeight: "700" }}>77.500 KWD</Text>
            </View>
          </View>

        </View>

      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'yellow',

    justifyContent: 'space-around',
  },
});
