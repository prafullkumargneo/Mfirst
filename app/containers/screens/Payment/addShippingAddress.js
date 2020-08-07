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
    FlatList, TextInput
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RNToasty } from 'react-native-toasty';
import Icon from 'react-native-vector-icons/Fontisto';
import addshippingAddressAction from '../../../actions/ShippingAddressActions/addShippingAddressActions';
import AsyncStorage from '@react-native-community/async-storage';


const colors = {

    darkGrey: "#737373",
    lightGrey: "#A5A5A5",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}

class AddShippingAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: props.navigation.state.params ? props.navigation.state.params.personName : "",
            firstNameValidationFlag: false,
            Street: props.navigation.state.params ? props.navigation.state.params.personStreet : "",
            StreetValidationFlag: false,
            Street2: props.navigation.state.params ? props.navigation.state.params.personStreet2 : "",
            Street2ValidationFlag: false,
            City: props.navigation.state.params ? props.navigation.state.params.personCity : "",
            CityValidationFlag: false,
            zipCode: props.navigation.state.params ? props.navigation.state.params.personZip : "",
            zipCodeValidationFlag: false,
            email: props.navigation.state.params ? props.navigation.state.params.personEmail : "",
            emailEmptyValidationFlag: false,
            emailValidationFlag: false,
            userId: null

        };
    }


    async componentDidMount() {
        await AsyncStorage.getItem('LoggedInData').then(value => {

            if (value) {
                let objectvalue = JSON.parse(value)
                this.setState({ userId: objectvalue.userId })
            }
        });
    }

    emailValidation(email) {
        var mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!mail.test(this.state.email)) {
            this.setState({
                emailValidationFlag: true,
                email: email,
                emailEmptyValidationFlag: false
            });
        }
        else {
            this.setState({
                emailValidationFlag: false,
                email: email,
                emailEmptyValidationFlag: false
            });
        }

    }

    shipingAddressData() {

        if (this.state.firstName == '') {
            this.setState({ firstNameValidationFlag: true })
            RNToasty.Error({
                title: "First name cannot be blank",
                titleSize: 15
            })
        }
        else if (this.state.email == '') {
            this.setState({ emailEmptyValidationFlag: true })
            RNToasty.Error({
                title: "Email cannot be blank",
                titleSize: 15
            })
        }
        else if (this.state.emailValidationFlag) {
            RNToasty.Error({
                title: "Please enter valid email",
                titleSize: 15
            })
        }
        else if (this.state.Street == '') {
            this.setState({ StreetValidationFlag: true })
            RNToasty.Error({
                title: "Street cannot be blank",
                titleSize: 15
            })
        }
        else if (this.state.Street2 == '') {
            this.setState({ Street2ValidationFlag: true })
            RNToasty.Error({
                title: "Street2 cannot be blank",
                titleSize: 15
            })
        }
        else if (this.state.City == '') {
            this.setState({ CityValidationFlag: true })
            RNToasty.Error({
                title: "City cannot be blank",
                titleSize: 15
            })
        }
        else if (this.state.zipCode == '') {
            this.setState({ zipCodeValidationFlag: true })
            RNToasty.Error({
                title: "zipCode cannot be blank",
                titleSize: 15
            })
        }
        else {

            let addShippingData = {
                Name: this.state.firstName,
                Street: this.state.Street,
                Street2: this.state.Street2,
                City: this.state.City,
                Zip: this.state.zipCode,
                user_id: this.state.userId && this.state.userId,
                shipping_status: this.props.navigation.state.params && this.props.navigation.state.params.shipping_id ? 'update' : 'new',
                ShippingId:this.props.navigation.state.params && this.props.navigation.state.params.shipping_id,
                Email: this.state.email
            }
            console.log("whole shipping data", addShippingData)
            this.props.addshippingAddressAction(addShippingData)
        }


    }


    render() {
        const { params } = this.props.navigation.state;
        console.log("props of shippingaddress", params)

        return (
            <View style={{ backgroundColor: "white" }}>
                <ProductStatus status={"shipping"} />
                <KeyboardAwareScrollView contentContainerStyle={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.05 }}>

                    <View style={{ paddingHorizontal: deviceWidth * 0.05, paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
                        <TextInput
                            style={[styles.inputStyles, { borderColor: this.state.firstNameValidationFlag ? 'red' : "#A5A5A5" }]}
                            onChangeText={firstName => this.setState({ firstName, firstNameValidationFlag: false })}
                            placeholder={"First Name"}
                            placeholderTextColor={this.state.firstNameValidationFlag ? 'red' : colors.lightGrey}
                            value={this.state.firstName}

                        />
                    </View>

                    <View style={{ paddingHorizontal: deviceWidth * 0.05, paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
                        <TextInput
                            style={[styles.inputStyles, { borderColor: this.state.emailEmptyValidationFlag || this.state.emailValidationFlag ? 'red' : "#A5A5A5" }]}
                            onChangeText={email => this.emailValidation(email)}
                            placeholderTextColor={this.state.emailValidationFlag || this.state.emailEmptyValidationFlag ? 'red' : colors.lightGrey}
                            placeholder={"Email"}
                            value={this.state.email}

                        />
                    </View>

                    <View style={{ paddingHorizontal: deviceWidth * 0.05, paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
                        <TextInput
                            style={[styles.inputStyles, { borderColor: this.state.StreetValidationFlag ? 'red' : "#A5A5A5" }]}
                            onChangeText={Street => this.setState({ Street, StreetValidationFlag: false })}
                            placeholder={"Street"}
                            placeholderTextColor={this.state.StreetValidationFlag ? 'red' : colors.lightGrey}
                            value={this.state.Street}

                        />
                    </View>

                    <View style={{ paddingHorizontal: deviceWidth * 0.05, paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
                        <TextInput
                            style={[styles.inputStyles, { borderColor: this.state.Street2ValidationFlag ? 'red' : "#A5A5A5" }]}
                            onChangeText={Street2 => this.setState({ Street2, Street2ValidationFlag: false })}
                            placeholder={"Street2"}
                            placeholderTextColor={this.state.Street2ValidationFlag ? 'red' : colors.lightGrey}
                            value={this.state.Street2}

                        />
                    </View>

                    <View style={{ paddingHorizontal: deviceWidth * 0.05, paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
                        <TextInput
                            style={[styles.inputStyles, { borderColor: this.state.CityValidationFlag ? 'red' : "#A5A5A5" }]}
                            onChangeText={City => this.setState({ City, CityValidationFlag: false })}
                            placeholderTextColor={this.state.CityValidationFlag ? 'red' : colors.lightGrey}
                            placeholder={"City"}
                            value={this.state.City}

                        />
                    </View>

                    <View style={{ paddingHorizontal: deviceWidth * 0.05, paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
                        <TextInput
                            style={[styles.inputStyles, { borderColor: this.state.zipCodeValidationFlag ? 'red' : "#A5A5A5" }]}
                            onChangeText={zipCode => this.setState({ zipCode, zipCodeValidationFlag: false })}
                            placeholderTextColor={this.state.zipCodeValidationFlag ? 'red' : colors.lightGrey}
                            placeholder={"zipCode"}
                            value={this.state.zipCode}

                        />
                    </View>



                </KeyboardAwareScrollView>

                <View style={{ paddingVertical: deviceHeight * 0.02, paddingHorizontal: deviceWidth * 0.3 }}>

                    <TouchableOpacity disabled={this.props.addshippingAddressReducer && this.props.addshippingAddressReducer.addShippingAddressLoading} onPress={() => this.shipingAddressData()} style={{ backgroundColor: '#3FC1C9', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.015 }}>
                        {this.props.addshippingAddressReducer && this.props.addshippingAddressReducer.addShippingAddressLoading ? <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Please wait...</Text> : <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Confirm</Text>}
                    </TouchableOpacity>
                </View>

            </View>

        );
    }
}


function mapStateToProps(state) {
    return {
        addshippingAddressReducer: state.addshippingAddressReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ addshippingAddressAction }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShippingAddress)

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
