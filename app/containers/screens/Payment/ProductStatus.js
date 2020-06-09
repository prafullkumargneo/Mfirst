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
    FlatList
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
import Icon from 'react-native-vector-icons/Fontisto';

const colors = {

    darkGrey: "#737373",
    lightGrey: "#e5e8e7",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}

export default class ProductStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }




    render() {
        let ProductStatus = this.props.status

        return (
            <View style={{ flex: 1, paddingVertical: "5%", paddingHorizontal: "7%", flexDirection: "row" }}>

                <View style={{ flex: 0.33, backgroundColor: "transparent", paddingHorizontal: "1%" }} >
                    <View style={{ backgroundColor: "blue", borderWidth: 3, borderColor: ProductStatus == 'shipping' ? colors.darkSkyBlue : colors.lightGrey }} />
                </View>

                <View style={{ flex: 0.33, backgroundColor: "transparent", paddingHorizontal: "1%" }} >
                    <View style={{ backgroundColor: "blue", borderWidth: 3, borderColor:ProductStatus == 'payment' ? colors.darkSkyBlue:colors.lightGrey }} />
                </View>

                <View style={{ flex: 0.33, backgroundColor: "transparent", paddingHorizontal: "1%" }} >
                    <View style={{ backgroundColor: "blue", borderWidth: 3,  borderColor:ProductStatus == 'reviewOrder' ? colors.darkSkyBlue:colors.lightGrey   }} />
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
