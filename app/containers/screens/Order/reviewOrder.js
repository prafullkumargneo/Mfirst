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
    FlatList, TouchableOpacity
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
import ProductStatus from '../Payment/ProductStatus';
import DeliveryIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNToasty } from 'react-native-toasty';

const colors = {

    darkGrey: "#737373",
    lightGrey: "#e5e8e7",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}

export default class ReviewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }





    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 0.1 }}>
                    <ProductStatus status={"reviewOrder"} />
                </View>
                <View style={{ flex: 0.87, backgroundColor: "transparent" }}>
                    <ScrollView style={{ height: deviceHeight }}>

                        <View style={{ backgroundColor: "transparent", flexDirection: "row", paddingHorizontal: deviceHeight * 0.03, paddingVertical: deviceHeight * 0.02, borderBottomWidth: 0.5, borderColor: "#A5A5A5" }}>

                            <View style={{ flex: 0.12, backgroundColor: "transparent" }}>
                                <Icon name={'check-circle'} size={30} color={"#3FC1C9"} />
                            </View>
                            <View style={{ flex: 0.76, backgroundColor: "transparent", backgroundColor: "transparent" }}>
                                <Text style={{ fontSize: 19 }}>Shipping</Text>
                                <View style={{ flexDirection: "row", paddingVertical: deviceHeight * 0.01 }}>
                                    <DeliveryIcon name={"truck-fast"} size={30} color={"#00333A"} />

                                    <Text style={{ paddingLeft: deviceHeight * 0.02, paddingTop: deviceHeight * 0.005, color: colors.darkGrey }}>Fast Delivery within 4 hrs</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.12, backgroundColor: "transparent", alignItems: "flex-end" }}>
                                <Text style={{ fontSize: 13, color: colors.darkBlue, textDecorationLine: "underline", textDecorationColor: colors.darkBlue }}>Edit</Text>
                            </View>

                        </View>

                        <View style={{ backgroundColor: "transparent", flexDirection: "row", paddingHorizontal: deviceHeight * 0.03, paddingVertical: deviceHeight * 0.02, borderWidth: 0.5, borderColor: "#A5A5A5" }}>

                            <View style={{ flex: 0.12, backgroundColor: "transparent" }}>
                                <Icon name={'check-circle'} size={30} color={"#3FC1C9"} />
                            </View>
                            <View style={{ flex: 0.76, backgroundColor: "transparent", backgroundColor: "transparent" }}>
                                <Text style={{ fontSize: 19 }}>Sending to</Text>
                                <View style={{ paddingVertical: deviceHeight * 0.005 }}>
                                    <Text style={{ color: colors.darkGrey }}>Street 12 palm strees</Text>
                                    <Text style={{ color: colors.darkGrey }}>850 tower bridge</Text>
                                    <Text style={{ color: colors.darkGrey }}>Sn matron CA 94066</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.12, backgroundColor: "transparent", alignItems: "flex-end" }}>
                                <Text onPress={()=>NavService.navigate('root','ShippingAddress')} style={{ fontSize: 13, color: colors.darkBlue, textDecorationLine: "underline", textDecorationColor: colors.darkBlue }}>Edit</Text>
                            </View>

                        </View>

                        <View style={{ backgroundColor: "transparent", flexDirection: "row", paddingHorizontal: deviceHeight * 0.03, paddingVertical: deviceHeight * 0.02, borderWidth: 0.19, borderColor: "#A5A5A5" }}>

                            <View style={{ flex: 0.12, backgroundColor: "transparent" }}>
                                <Icon name={'check-circle'} size={30} color={"#3FC1C9"} />
                            </View>
                            <View style={{ flex: 0.76, backgroundColor: "transparent", backgroundColor: "transparent" }}>
                                <Text style={{ fontSize: 19 }}>Paying with</Text>
                                <View style={{ paddingVertical: deviceHeight * 0.005 }}>
                                    <Text style={{ color: colors.darkGrey }}>Visa ending 1234</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.12, backgroundColor: "transparent", alignItems: "flex-end" }}>
                                <Text  onPress={()=>NavService.navigate('root','Payement')} style={{ fontSize: 13, color: colors.darkBlue, textDecorationLine: "underline", textDecorationColor: colors.darkBlue }}>Edit</Text>
                            </View>

                        </View>

                        <View style={{ backgroundColor: "transparent", paddingHorizontal: deviceHeight * 0.03, paddingVertical: deviceHeight * 0.02 }}>

                            <Text style={{ color: '#2B2B2B', fontSize: 16, paddingVertical: deviceHeight * 0.01 }}> 3 items</Text>

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
                </View>

                <View style={{ flex: 0.13, backgroundColor: "transparent", flexDirection: "row", paddingHorizontal: deviceHeight * 0.04, borderWidth: 1, borderColor: "#A5A5A5" }} >

                    <View style={{ flex: 0.5, justifyContent: 'center', backgroundColor: "transparent" }}>
                        <Text style={{ fontSize: 16, color: "#2B2B2B", fontWeight: "700" }}>Total</Text>
                        <Text style={{ fontSize: 16, color: "#003351", fontWeight: "700" }}>77.500 KWD</Text>
                    </View>

                    <View style={{ flex: 0.5, justifyContent: 'center', backgroundColor: "transparent" }}>

                        <TouchableOpacity onPress={() => {RNToasty.Success({
                            title: "Your order has been placed",
                            titleSize: 15
                        }), NavService.navigate('root','OrderAccepted') } } style={{ backgroundColor: '#3FC1C9', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.015 }}>
                            <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>

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
