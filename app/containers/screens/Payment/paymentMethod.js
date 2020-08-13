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
    FlatList, TextInput, TouchableOpacity, ActivityIndicator,Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from 'react-navigation-drawer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _Input from '../../../components/Input/_Input';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _Header from '../../../components/Header/_MainHeader';
import ProductStatus from './ProductStatus';
import { deviceWidth, deviceHeight } from '../../../constants/globals';
import DummyJSON from "../../../lib/dummyJson";
import appStyles from '../../../constants/appStyle';
import NavService from '../../navigators/navigationService';
import { RNToasty } from 'react-native-toasty';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardIcon from 'react-native-vector-icons/Fontisto';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import Creditcard from './creditCard'
import { WebView } from 'react-native-webview';
import getPaymentOptions from '../../../actions/PaymentActions/getPaymentOptionsActions';


const colors = {

    darkGrey: "#737373",
    lightGrey: "#A5A5A5",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}

class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentMethodFlag: "creditcard",
            billingAddress: false,
            visible: true,
            url: 'https://obscure-journey-86933.herokuapp.com/api/payment/card',
            onEndUrl: "https://hsa-api.herokuapp.com/api/payment/payfort/merchantUrl",
            productOrderId: null,
            orderId: null,
            selectedPaymentOptions: null,
            selectedPaymentOptionsData: null,
        };
    }
    async componentDidMount() {

        await this.fetchPaymentOptions()
    }

    async fetchPaymentOptions() {

        await AsyncStorage.getItem('LoggedInData').then(value => {

            if (value) {
                let objectvalue = JSON.parse(value)
                this.setState({ orderId: objectvalue.orderDetails && objectvalue.orderDetails.orderId })
            }
        });
        await AsyncStorage.getItem('OrderId').then(value => {
            if (value) {
                let objectvalue = JSON.parse(value)
                this.setState({ productOrderId: objectvalue.order_id })

            }
        });
        let paymentOrderId = {
            orderId: this.state.productOrderId ? this.state.productOrderId : this.state.orderId
        }
        this.props.getPaymentOptions(paymentOrderId)

    }

    // _onNavigationStateChange(webViewState) {
    //     console.log("webview response===>", webViewState)
    //     if (webViewState.url === this.state.onEndUrl) {
    //         let data = {
    //             service_id: this.props.navigation.getParam('requestId', null)
    //         };
    //         console.log("data of payment", data)
    //         this.refs.loader.load();
    //         data = JSON.stringify(data);
    //         Api.paymentStatus(this._makePaymentCbForCard, data);
    //         console.log('webview state===>>', webViewState);
    //     }

    // }

    selectedPayment(item, index) {
        this.setState({ selectedPaymentOptions: index, selectedPaymentOptionsData: item })
    }


    paymentMethod(method) {
        this.setState({ paymentMethodFlag: method })
    }

    _onChange(form) {
        console.log(form);
    }

    // hideSpinner() {
    //     this.setState({ visible: false });
    // }


    renderPaymentOptions(item, index) {
        return (
            <View key={index} style={{ borderWidth: 0.5, borderColor: colors.lightGrey, paddingVertical: '2%', margin: "2%", backgroundColor: 'white' }}>

                <TouchableOpacity onPress={() => this.selectedPayment(item, index)} style={{ backgroundColor: 'transparent', flexDirection: 'row', paddingHorizontal: deviceWidth * 0.035, borderBottomColor: colors.lightGrey, borderBottomWidth: 0.5, paddingVertical: '2%' }}>
                    {this.state.selectedPaymentOptions === index ? <Icon name={'checkbox-multiple-marked-circle'} size={23} color={"#3FC1C9"} /> : <Icon name={'checkbox-blank-circle-outline'} size={23} color={"#3FC1C9"} />}
                    {this.state.selectedPaymentOptions === index ? <Text style={{ fontSize: 17, color: colors.darkSkyBlue, fontWeight: '700', paddingLeft: "3%" }}>Selected</Text> : <Text style={{ fontSize: 16, color: colors.darkBlue, paddingLeft: "3%" }}>Select</Text>}
                </TouchableOpacity>

                <View style={{ paddingLeft: deviceWidth * 0.11, backgroundColor: 'transparent', paddingVertical: "3%" }}>
                    <Text style={{ fontSize: 22, color: colors.darkBlue }}>{item.paymentAcquirerName}</Text>



                </View>


            </View>
        )
    }

    paymentProceed() {

        if (!this.state.selectedPaymentOptionsData) {
            RNToasty.Error({
                title: "Please select payment method",
                titleSize: 15
            })
        }
        else {
            let PaymentData = {
                paymentAcquirerId: this.state.selectedPaymentOptionsData.paymentAcquirerId,
                orderId: this.state.productOrderId ? this.state.productOrderId : this.state.orderId
            }
            NavService.navigate('root', 'ReviewOrder', PaymentData)

        }

    }

    retryPaymentOptions() {
        this.fetchPaymentOptions()

    }


    render() {
        console.log("getPaymentOptionsData===>", this.props.getPaymentOptionsData)
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>

                <ProductStatus status={"payment"} />

                {/* <WebView
                    source={{ uri: 'http://sms.future-club.com/bulksms/login.aspx' }}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    onError={this._onNavigationStateChange.bind(this)}
                    onMessage={this.onMessage}
                    onLoad={() => this.hideSpinner()}

                />
                {this.state.visible && (
                    <ActivityIndicator
                        style={{ position: "absolute", top: deviceHeight / 3, left: deviceWidth / 2.3 }}
                        size="large"
                    />
                )}
                <View style={{ paddingVertical: deviceHeight * 0.01, paddingHorizontal: deviceWidth * 0.3, backgroundColor: "transparent" }}>

                    <TouchableOpacity onPress={() => { NavService.navigate('root', 'ReviewOrder') }} style={{ backgroundColor: '#3FC1C9', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.015 }}>
                        <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Continue</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ paddingVertical: deviceHeight * 0.015, paddingHorizontal: deviceWidth * 0.26, backgroundColor: "transparent" }}>

                    <TouchableOpacity style={{ backgroundColor: 'transparent', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.015, borderWidth: 1, borderColor: colors.darkBlue }}>
                        <Text style={{ fontSize: 15, color: colors.darkBlue, fontWeight: "700" }}>Pay with cash</Text>
                    </TouchableOpacity>

                </View> */}

                {/* <View style={{ flexDirection: "row", borderBottomWidth: 0.5, borderColor: "#A5A5A5", backgroundColor: "transparent", paddingTop: deviceHeight * 0.04 }}>

                    <View style={{ paddingVertical: deviceHeight * 0.015, flex: 0.33, backgroundColor: "transparent", justifyContent: "center", alignItems: "center", borderBottomColor: this.state.paymentMethodFlag === "creditcard" ? colors.darkBlue : null, borderBottomWidth: this.state.paymentMethodFlag === "creditcard" ? 3 : null }}>
                        <TouchableOpacity onPress={() => this.paymentMethod("creditcard")} style={{ backgroundColor: "white" }}>
                            <Text style={{ fontSize: 14, color: this.state.paymentMethodFlag === "creditcard" ? colors.darkBlue : "#A5A5A5", fontWeight: "700" }}>CREDIT CARD</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: deviceHeight * 0.015, flex: 0.34, backgroundColor: "transparent", justifyContent: "center", alignItems: "center", borderBottomColor: this.state.paymentMethodFlag === "giftcard" ? colors.darkBlue : null, borderBottomWidth: this.state.paymentMethodFlag === "giftcard" ? 3 : null }}>
                        <TouchableOpacity onPress={() => this.paymentMethod("giftcard")}>
                            <Text style={{ fontSize: 14, color: this.state.paymentMethodFlag === "giftcard" ? colors.darkBlue : "#A5A5A5", fontWeight: "700" }}>GIFT CARD</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: deviceHeight * 0.015, flex: 0.33, backgroundColor: "transparent", justifyContent: "center", alignItems: "center", borderBottomColor: this.state.paymentMethodFlag === "knet" ? colors.darkBlue : null, borderBottomWidth: this.state.paymentMethodFlag === "knet" ? 3 : null }}>
                        <TouchableOpacity onPress={() => this.paymentMethod("knet")}>
                            <Text style={{ fontSize: 14, color: this.state.paymentMethodFlag === "knet" ? colors.darkBlue : "#A5A5A5", fontWeight: "700" }}>KNET</Text>
                        </TouchableOpacity>
                    </View>


                </View> */}

                {
                    this.props.getPaymentOptionsData.getPaymentOptionLoading ?
                        <View style={{ flex: 1,alignItems:'center' }}>
                             <Image  source={require("../../../assets/images/gifloader.gif")}  />
                        </View>
                        :
                        this.props.getPaymentOptionsData.getPaymentOptionData && this.props.getPaymentOptionsData.getPaymentOptionData ?

                            this.props.getPaymentOptionsData.getPaymentOptionData && this.props.getPaymentOptionsData.getPaymentOptionData.paymentDetails ?

                                <KeyboardAwareScrollView style={{ height: deviceHeight, width: deviceWidth }}>

                                    {/* this code as per mockuups */}
                                    {/* {
                        this.state.paymentMethodFlag === 'creditcard' ?

                            <View style={{ paddingVertical: deviceHeight * 0.03, backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.05 }}>

                                <View style={{ paddingVertical: deviceHeight * 0.01, backgroundColor: "transparent", flexDirection: "row" }}>
                                    <CardIcon name={'mastercard'} size={25} color={'red'} style={{ left: deviceWidth * 0.01 }} />
                                    <CardIcon name={'visa'} size={25} color={"blue"} style={{ left: deviceWidth * 0.02 }} />

                                </View>

                                <View style={{ paddingVertical: deviceHeight * 0.025, backgroundColor: "transparent" }}>
                                    <CreditCardInput
                                        requiresName={true}
                                        onChange={this._onChange}
                                        allowScroll={true}
                                    />


                                </View>





                            </View>
                            : null

                    } */}

                                    {/* <View style={{ paddingVertical: deviceHeight * 0.01, backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.05, paddingBottom: deviceHeight * 0.05 }}>
                        <Text style={{ fontSize: 16, color: "#2C2C2C", fontWeight: "700" }}>Billing address</Text>

                        <TouchableOpacity onPress={() => this.setState({ billingAddress: !this.state.billingAddress })} style={{ backgroundColor: "transparent", flexDirection: "row", paddingVertical: deviceHeight * 0.022 }}>
                            {this.state.billingAddress ? <Icon name={'checkbox-marked'} size={25} color={colors.darkSkyBlue} /> : <Icon name={'checkbox-blank-outline'} size={25} color={colors.darkSkyBlue} />}
                            <Text style={{ fontSize: 14, color: "#2C2C2C", justifyContent: "center", paddingHorizontal: "2%", top: "1%" }}>Same as shipping</Text>
                        </TouchableOpacity>

                    </View> */}




                                    <View style={{ paddingVertical: deviceHeight * 0.03, paddingHorizontal: deviceWidth * 0.03, paddingBottom: deviceHeight * 0.15 }}>

                                        {

                                            this.props.getPaymentOptionsData.getPaymentOptionData.paymentDetails.map((item, index) => {
                                                return (
                                                    this.renderPaymentOptions(item, index)
                                                )

                                            })



                                        }

                                    </View>

                                    <View style={{ paddingVertical: deviceHeight * 0.01, paddingHorizontal: deviceWidth * 0.3, backgroundColor: "transparent" }}>

                                        <TouchableOpacity onPress={() => { this.paymentProceed() }} style={{ backgroundColor: '#3FC1C9', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.015 }}>
                                            <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Continue</Text>
                                        </TouchableOpacity>

                                    </View>
                                    {/* <View style={{ paddingVertical: deviceHeight * 0.015, paddingHorizontal: deviceWidth * 0.26, backgroundColor: "transparent" }}>

                                <TouchableOpacity style={{ backgroundColor: 'transparent', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.015, borderWidth: 1, borderColor: colors.darkBlue }}>
                                    <Text style={{ fontSize: 15, color: colors.darkBlue, fontWeight: "700" }}>Pay with cash</Text>
                                </TouchableOpacity>

                            </View> */}
                                </KeyboardAwareScrollView>
                                :
                                <View style={{ flex:1, alignItems: 'center' }}>
                                    <Text>No payment option is there in your order.</Text>
                                </View>
                            :
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ paddingVertical: '3%' }}>Something went wrong ..</Text>
                                <Text onPress={() => this.retryPaymentOptions()} style={{ color: 'skyblue' }}>Retry</Text>
                            </View>
                }


            </View>

        );
    }
}

function mapStateToProps(state) {
    return {
        getPaymentOptionsData: state.getPaymentOptionsData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ getPaymentOptions }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod)

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: 'yellow',

        justifyContent: 'space-around',
    },
    inputStyles: {
        height: 47, borderColor: "#A5A5A5", borderWidth: 1, paddingLeft: '3%'
    }
});
