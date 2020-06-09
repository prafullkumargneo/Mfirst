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
    FlatList,TouchableOpacity
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class OrderAccepted extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }




    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.4,justifyContent:"flex-end",alignItems:"center" }}>
                    <Text style={{fontSize:20}}>Your Order is on the way</Text>
                </View>
                <View style={{ flex: 0.6,paddingTop:"7%",paddingHorizontal:deviceHeight*0.08}}>
                <TouchableOpacity onPress={() => { NavService.navigate('root','Orders') } } style={{ flexDirection:"row" ,backgroundColor: '#3FC1C9', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.015 }}>
                            <Text style={{ fontSize: 15, color: "white", fontWeight: "700",paddingHorizontal:"3%" }}>Go to Order</Text>
                            <Icon name={'arrow-right'} size={25} color={"white"}/>
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
});
