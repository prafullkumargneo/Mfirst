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
    FlatList, TextInput, TouchableOpacity
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
import { RNToasty } from 'react-native-toasty';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardIcon from 'react-native-vector-icons/Fontisto';

const colors = {

    darkGrey: "#737373",
    lightGrey: "#A5A5A5",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}

export default class Creditcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentMethodFlag: "creditcard"
        };
    }

    paymentMethod(method) {
        this.setState({ paymentMethodFlag: method })
    }


    render() {

        return (
            <KeyboardAwareScrollView style={{ backgroundColor: "white",height:deviceHeight }}>
              

                
                    {
                        this.state.paymentMethodFlag === 'creditcard' ?
                            <View style={{ paddingVertical: deviceHeight * 0.02, backgroundColor: "yellow", paddingHorizontal: deviceWidth * 0.05 }}>

                                <View style={{ paddingVertical: deviceHeight * 0.01, backgroundColor: "orange", flexDirection: "row" }}>
                                    <CardIcon name={'mastercard'} size={25} color={'red'} style={{ left: deviceWidth * 0.01 }} />
                                    <CardIcon name={'visa'} size={25} color={"blue"} style={{ left: deviceWidth * 0.02 }} />

                                </View>

                                <View style={{ paddingVertical: deviceHeight * 0.025, backgroundColor: "pink" }}>
                                    <TextInput
                                        style={styles.inputStyles}
                                        onChangeText={firstName => this.setState({ firstName })}
                                        placeholder={"First Name on the cart"}
                                        placeholderTextColor={colors.lightGrey}
                                        value={this.state.firstName}

                                    />
                                </View>

                                <View style={{ paddingVertical: deviceHeight * 0.012, backgroundColor: "pink" }}>
                                    <TextInput
                                        style={styles.inputStyles}
                                        onChangeText={firstName => this.setState({ firstName })}
                                        placeholder={"Last Name on the cart"}
                                        placeholderTextColor={colors.lightGrey}
                                        value={this.state.firstName}

                                    />
                                </View>

                                <View style={{ paddingVertical: deviceHeight * 0.015, backgroundColor: "pink" }}>
                                    <TextInput
                                        style={styles.inputStyles}
                                        onChangeText={firstName => this.setState({ firstName })}
                                        placeholder={"Card Number"}
                                        placeholderTextColor={colors.lightGrey}
                                        value={this.state.firstName}

                                    />
                                </View>

                            </View>
                            : null

                    }

                    <View style={{ paddingVertical: deviceHeight * 0.06, backgroundColor: "green", paddingHorizontal: deviceWidth * 0.05, }}>
                        <Text style={{ fontSize: 16, color: "#2C2C2C", fontWeight: "700" }}>Billing address</Text>

                        <View style={{ backgroundColor: "pink", flexDirection: "row", paddingVertical: deviceHeight * 0.022 }}>
                            <Icon name={'checkbox-blank-outline'} size={25} color={colors.darkSkyBlue} />
                            <Text style={{ fontSize: 14, color: "#2C2C2C", justifyContent: "center", paddingHorizontal: "2%", top: "1%" }}>Same as shipping</Text>
                        </View>

                    </View>

                    <View style={{ paddingVertical: deviceHeight * 0.01, paddingHorizontal: deviceWidth * 0.3, backgroundColor: "orange" }}>

                        <TouchableOpacity onPress={() => { }} style={{ backgroundColor: '#3FC1C9', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.015 }}>
                            <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Continue</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ paddingVertical: deviceHeight * 0.015, paddingHorizontal: deviceWidth * 0.26, backgroundColor: "pink" }}>

                        <TouchableOpacity style={{ backgroundColor: 'transparent', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.015, borderWidth: 1, borderColor: colors.darkBlue }}>
                            <Text style={{ fontSize: 15, color: colors.darkBlue, fontWeight: "700" }}>Pay with cash</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>
            

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
