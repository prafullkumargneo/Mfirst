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
    FlatList, TextInput, TouchableOpacity, ActivityIndicator
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
            selectedAddressData:null,
            userId: null

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
        await AsyncStorage.getItem('LoggedInData').then(value => {

            if (value) {
                let objectvalue = JSON.parse(value)

                let getShippingAdress = {
                    shipping_status: "get",
                    user_id: objectvalue.userId
                }
                this.props.shippingAddressAction(getShippingAdress)
            }
        });
    }

    componentWillUnmount() {
        this.reRenderSomething.remove();
    }
    async componentDidMount() {
        await AsyncStorage.getItem('LoggedInData').then(value => {

            if (value) {
                let objectvalue = JSON.parse(value)
                this.setState({ userId: objectvalue.userId })
                let getShippingAdress = {
                    shipping_status: "get",
                    user_id: objectvalue.userId
                }
                this.props.shippingAddressAction(getShippingAdress)
            }
        });
    }

    selectedAddress(item, index) {
        this.setState({ selectedAddress: index,selectedAddressData:item })
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
                            shipping_id: item.shipping_id,
                            user_id: this.state.userId && this.state.userId
                        }
                        console.log('Delete shipping data', deleteShippingAdress)
                        this.props.shippingAddressAction(deleteShippingAdress)
                    }
                }
            ],
            { cancelable: false }
        );

    }

    getShippingAddress(item, index) {
        return (
            <TouchableOpacity onPress={() => this.selectedAddress(item, index)} style={{ borderWidth: 0.5, borderColor: colors.lightGrey, paddingVertical: '2%', margin: "2%", marginHorizontal: '5%', backgroundColor: 'white' }}>

                <View style={{ backgroundColor: 'transparent', flexDirection: 'row', paddingHorizontal: deviceWidth * 0.035, borderBottomColor: colors.lightGrey, borderBottomWidth: 0.5, paddingVertical: '2%' }}>
                    {this.state.selectedAddress === index ? <Icon name={'checkbox-multiple-marked-circle'} size={23} color={"#3FC1C9"} /> : <Icon name={'checkbox-blank-circle-outline'} size={23} color={"#3FC1C9"} />}
                    {this.state.selectedAddress === index ? <Text style={{ fontSize: 17, color: colors.darkSkyBlue, fontWeight: '700', paddingLeft: "3%" }}>Selected</Text> : <Text style={{ fontSize: 16, color: colors.darkBlue, paddingLeft: "3%" }}>Select</Text>}
                </View>

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


            </TouchableOpacity>
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
            NavService.navigate('root', 'Payement')
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
        console.log('this.state.selectedAddress',this.state.selectedAddress)
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <ProductStatus status={"shipping"} />
                {/* <KeyboardAwareScrollView contentContainerStyle={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.05 }}>

                    <View style={{ paddingHorizontal: deviceWidth * 0.05, paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
                        <TextInput
                            style={styles.inputStyles}
                            onChangeText={firstName => this.setState({ firstName })}
                            placeholder={"First Name"}
                            placeholderTextColor={colors.lightGrey}
                            value={this.state.firstName}

                        />
                    </View>

                    <View style={{ paddingHorizontal: deviceWidth * 0.05, paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
                        <TextInput
                            style={styles.inputStyles}
                            onChangeText={lastName => this.setState({ lastName })}
                            placeholder={"Last Name"}
                            placeholderTextColor={colors.lightGrey}
                            value={this.state.lastName}

                        />
                    </View>

                    <View style={{ paddingHorizontal: deviceWidth * 0.05, paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
                        <TextInput
                            style={styles.inputStyles}
                            onChangeText={phoneNumber => this.setState({ phoneNumber })}
                            placeholder={"Phone"}
                            placeholderTextColor={colors.lightGrey}
                            value={this.state.phoneNumber}

                        />
                    </View>

                    <View style={{ paddingHorizontal: deviceWidth * 0.05, paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
                        <TextInput
                            style={styles.inputStyles}
                            onChangeText={countryName => this.setState({ countryName })}
                            placeholderTextColor={colors.lightGrey}
                            placeholder={"Country Name"}
                            value={this.state.countryName}

                        />
                    </View>

                </KeyboardAwareScrollView>

                <View style={{ paddingVertical: deviceHeight * 0.1, paddingHorizontal: deviceWidth * 0.3 }}>

                    <TouchableOpacity onPress={() => this.shipingAddressData()} style={{ backgroundColor: '#3FC1C9', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.015 }}>
                        <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Confirm</Text>
                    </TouchableOpacity>
                </View> */}

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
                                <ActivityIndicator size={"large"} />
                            </View>
                            :
                            this.props.shippingAddressReducer.shippingAddressData && this.props.shippingAddressReducer.shippingAddressData.shippingDetails.map((item, index) => {
                                return (
                                    this.getShippingAddress(item, index)
                                )
                            })
                    }
                </ScrollView>

                {/* <View style={{ paddingVertical: deviceHeight * 0.01, paddingHorizontal: deviceWidth * 0.3, position:"absolute"}}> */}

                <TouchableOpacity onPress={() => this.shipingAddressData()} style={{ position: 'absolute', backgroundColor: '#3FC1C9', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.014, paddingHorizontal: deviceWidth * 0.1, top: deviceHeight * 0.84, left: deviceWidth * 0.35 }}>
                    <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Confirm</Text>
                </TouchableOpacity>
                {/* </View>  */}

            </View>

        );
    }
}


function mapStateToProps(state) {
    return {
        shippingAddressReducer: state.shippingAddressReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ shippingAddressAction }, dispatch)
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
