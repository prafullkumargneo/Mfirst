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
    FlatList, TextInput
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
const colors = {

    darkGrey: "#737373",
    lightGrey: "#A5A5A5",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}

export default class ShippingAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            countryName: ""
        };
    }

    shipingAddressData() {
           
            if (this.state.firstName == '') {
                RNToasty.Error({
                    title: "First name cannot be blank",
                    titleSize: 15
                })
            }
           else if (this.state.lastName == '') {
                RNToasty.Error({
                    title: "Last name cannot be blank",
                    titleSize: 15
                })
            }
            else if (this.state.phoneNumber == '') {
                RNToasty.Error({
                    title: "Phone number cannot be blank",
                    titleSize: 15
                })
            }
            else if (this.state.countryName == '') {
                RNToasty.Error({
                    title: "Country name cannot be blank",
                    titleSize: 15
                })
            }
            else{

                RNToasty.Success({
                    title: "Address added.",
                    titleSize: 15
                })
                NavService.navigate('root','Payement')
            }

        
    }


    render() {

        return (
            <View style={{ backgroundColor: "white" }}>
                <ProductStatus status={"shipping"} />
                <KeyboardAwareScrollView contentContainerStyle={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.05 }}>

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
    inputStyles: {
        height: 47, borderColor: "#A5A5A5", borderWidth: 1, paddingLeft: '3%'
    }
});
