import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Keyboard,
    Alert,
    StatusBar,
    ScrollView,
    FlatList, TextInput, TouchableOpacity, ActivityIndicator,Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation-drawer';
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
import shippingAddressAction from '../../../actions/ShippingAddressActions/shippingAddressActions';
import addshippingAddressAction from '../../../actions/ShippingAddressActions/addShippingAddressActions';
import shippingAddressSelected from '../../../actions/ShippingAddressActions/ShippingAddressSelectedAction';
import AsyncStorage from '@react-native-community/async-storage';


const colors = {

    darkGrey: "#737373",
    lightGrey: "#A5A5A5",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}

class ShippingAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            countryName: "",
            selectedAddress: null,
            selectedAddressData: null,
            userId: null,
            orderId: null,
            productOrderId: null

        };
        this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
            //Put your code here you want to rerender, in my case i want to rerender the data 
            //im fetching from firebase and display the changes

            this.someAction();
            this.forceUpdate();
        });
    }
    async someAction() {
        // alert()
        await this.getAdress()
    }

    componentWillUnmount() {
        this.reRenderSomething.remove();
    }
    async componentDidMount() {
        await this.getAdress()
    }

    getAdress() {
        AsyncStorage.getItem('LoggedInData').then(value => {

            if (value) {
                let objectvalue = JSON.parse(value)
                this.setState({ userId: objectvalue.userId })
                let getShippingAdress = {
                    shipping_status: "get",
                    user_id: objectvalue.userId,
                    orderId: objectvalue.orderDetails && objectvalue.orderDetails.orderId
                }
                this.props.shippingAddressAction(getShippingAdress)
            }
        });
        AsyncStorage.getItem('OrderId').then(value => {
            if (value) {
                let objectvalue = JSON.parse(value)
                this.setState({ productOrderId: objectvalue.order_id })
                console.log("OrderId if shopping cart", objectvalue)

            }
        });
    }

    selectedAddress(item, index) {
        this.setState({ selectedAddress: index, selectedAddressData: item })
    }
    editAddress(item) {
        NavService.navigate('root', 'AddShippingAddress', item);
    }

    Delete(item) {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete address.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        let deleteShippingAdress = {
                            shipping_status: "delete",
                            ShippingId: item.shipping_id,
                            user_id: this.state.userId && this.state.userId
                        }
                        console.log('Delete shipping data', deleteShippingAdress)
                        this.props.addshippingAddressAction(deleteShippingAdress)
                        this.getAdress()
                    }
                }
            ],
            { cancelable: false }
        );

    }

    getShippingAddress(item, index) {
        return (
            <View key={index} style={{ borderWidth: 0.5, borderColor: colors.lightGrey, paddingVertical: '2%', margin: "2%", marginHorizontal: '5%', backgroundColor: 'white' }}>

                <TouchableOpacity onPress={() => this.selectedAddress(item, index)} style={{ backgroundColor: 'transparent', flexDirection: 'row', paddingHorizontal: deviceWidth * 0.035, borderBottomColor: colors.lightGrey, borderBottomWidth: 0.5, paddingVertical: '2%' }}>
                    {this.state.selectedAddress === index ? <Icon name={'checkbox-multiple-marked-circle'} size={23} color={"#3FC1C9"} /> : <Icon name={'checkbox-blank-circle-outline'} size={23} color={"#3FC1C9"} />}
                    {this.state.selectedAddress === index ? <Text style={{ fontSize: 17, color: colors.darkSkyBlue, fontWeight: '700', paddingLeft: "3%" }}>Selected</Text> : <Text style={{ fontSize: 16, color: colors.darkBlue, paddingLeft: "3%" }}>Select</Text>}
                </TouchableOpacity>

                <View style={{ paddingLeft: deviceWidth * 0.11, backgroundColor: 'transparent', paddingVertical: "3%" }}>
                    {item.personName ? <Text style={{ fontSize: 14, color: colors.darkBlue }}>{item.personName}</Text> : null}
                    {item.personEmail ? <Text style={{ fontSize: 14, color: colors.darkBlue }}>{item.personEmail}</Text> : null}
                    {item.personStreet ? <Text style={{ fontSize: 14, color: colors.darkBlue }}>{item.personStreet}</Text> : null}
                    {item.personStreet2 ? <Text style={{ fontSize: 14, color: colors.darkBlue }}>{item.personStreet2}</Text> : null}
                    {item.personCity ? <Text style={{ fontSize: 14, color: colors.darkBlue }}>{item.personCity}</Text> : null}
                    {item.personZip ? <Text style={{ fontSize: 14, color: colors.darkBlue }}>{item.personZip}</Text> : null}
                    {item.personState ? <Text style={{ fontSize: 14, color: colors.darkBlue }}>{item.personState}</Text> : null}
                    {item.personCountry ? <Text style={{ fontSize: 14, color: colors.darkBlue }}>{item.personCountry}</Text> : null}

                    <View style={{ paddingTop: '4%', width: deviceWidth * 0.7, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <Text onPress={() => this.editAddress(item)} style={{ textDecorationLine: "underline", fontSize: 14, color: colors.darkBlue, paddingRight: deviceWidth * 0.135 }}>Edit</Text>
                        <Text onPress={() => this.Delete(item)} style={{ textDecorationLine: "underline", fontSize: 14, color: "red" }}>Delete</Text>

                    </View>

                </View>


            </View>
        )

    }
    addAddress() {
        NavService.navigate('root', 'AddShippingAddress')
    }
    shipingAddressData() {

        if (!this.state.selectedAddressData) {
            RNToasty.Error({
                title: "Please select address",
                titleSize: 15
            })
        }
        else {
            let selectedAdress = {
                orderId: this.state.productOrderId ? this.state.productOrderId : this.state.orderId,
                shippingId: this.state.selectedAddressData.shipping_id
            }
            this.props.shippingAddressSelected(selectedAdress)
          
        }
        // else if (this.state.lastName == '') {
        //     RNToasty.Error({
        //         title: "Last name cannot be blank",
        //         titleSize: 15
        //     })
        // }
        // else if (this.state.phoneNumber == '') {
        //     RNToasty.Error({
        //         title: "Phone number cannot be blank",
        //         titleSize: 15
        //     })
        // }
        // else if (this.state.countryName == '') {
        //     RNToasty.Error({
        //         title: "Country name cannot be blank",
        //         titleSize: 15
        //     })
        // }
        // else {

        //     let addShippingData = {
        //         Name: 'Praful',
        //         Street: 'street1 m',
        //         Street2: 'strret2',
        //         City: 'new',
        //         Zip: '253645',
        //         user_id: 7,
        //         shipping_status: 'new',
        //         Email: 'test@test.com'
        //     }
        //     this.props.shippingAddressAction(addShippingData)
        //     // RNToasty.Success({
        //     //     title: "Address added.",
        //     //     titleSize: 15
        //     // })
        //     // NavService.navigate('root','Payement')
        // }


    }


    render() {
        console.log('this.state.SelectedshippingAddressReducer', this.props.SelectedshippingAddressReducer)
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <ProductStatus status={"shipping"} />
                <View style={{ paddingHorizontal: "9%", paddingVertical: '4%', backgroundColor: "transparent" }}>
                    <TouchableOpacity onPress={() => this.addAddress()} style={{ paddingHorizontal: '2%', paddingVertical: "3%", borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.darkBlue, flexDirection: 'row' }}>
                        <Icon size={20} name={'plus'} style={{ paddingRight: '2%' }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: colors.darkBlue }}>Add New Shipping Address</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ backgroundColor: "transparent", height: deviceHeight }}>
                    {
                        this.props.shippingAddressReducer.shippingAddressLoading ?
                            <View style={{ height: deviceHeight * 0.7, justifyContent: "center", alignItems: "center" }}>
                             <Image  source={require("../../../assets/images/gifloader.gif")}  />
                            </View>
                            :
                            this.props.shippingAddressReducer.shippingAddressData && this.props.shippingAddressReducer.shippingAddressData.shippingDetails.length ?
                                this.props.shippingAddressReducer.shippingAddressData.shippingDetails.map((item, index) => {
                                    return (
                                        this.getShippingAddress(item, index)
                                    )
                                })
                                :
                                <View style={{ alignItems: 'center', paddingTop: deviceHeight * 0.3 }}>
                                    <Text>You dont have any address added.Please add an address</Text>
                                </View>
                    }
                </ScrollView>

                {/* <View style={{ paddingVertical: deviceHeight * 0.01, paddingHorizontal: deviceWidth * 0.3, position:"absolute"}}> */}

                <TouchableOpacity disabled={this.props.SelectedshippingAddressReducer.SelectedshippingAddresLoading} onPress={() => this.shipingAddressData()} style={{ position: 'absolute', backgroundColor: '#3FC1C9', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.014, paddingHorizontal: deviceWidth * 0.1, top: deviceHeight * 0.84, left: deviceWidth * 0.35 }}>
                    {this.props.SelectedshippingAddressReducer.SelectedshippingAddresLoading ?    <Image  source={require("../../../assets/images/PleaseWait.gif")}  /> : <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Confirm</Text>}
                </TouchableOpacity>
                {/* </View>  */}

            </View>

        );
    }
}


function mapStateToProps(state) {
    return {
        shippingAddressReducer: state.shippingAddressReducer,
        SelectedshippingAddressReducer: state.SelectedshippingAddressReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ shippingAddressAction, addshippingAddressAction, shippingAddressSelected }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress)

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
