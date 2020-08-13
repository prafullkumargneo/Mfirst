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
    FlatList, TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from 'react-navigation-drawer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import _Input from '../../../components/Input/_Input';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _Header from '../../../components/Header/_MainHeader';
import { deviceWidth, deviceHeight } from '../../../constants/globals';
import DummyJSON from "../../../lib/dummyJson";
import appStyles from '../../../constants/appStyle';
import NavService from '../../navigators/navigationService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getorderList from "../../../actions/OrderActions/orderListingActions";

const colors = {

    darkGrey: "#737373",
    lightGrey: "#e5e8e7",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:null
        };
    }

    async componentDidMount() {

        await AsyncStorage.getItem('LoggedInData').then(value => {

            if (value) {
                let objectvalue = JSON.parse(value)
                this.setState({ userId: objectvalue.userId })
                let orderListData = {
                    userId: objectvalue.userId
                }
                this.props.getorderList(orderListData)
            }
        });

    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#e5e8e7' }}>
                <ScrollView style={{ height: deviceHeight, width: deviceWidth, backgroundColor: '#e5e8e7' }}>

                    {DummyJSON.OrdersList.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => NavService.navigate('root', 'OrdersDetails')} key={index} style={{ flexDirection: "row", paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceHeight * 0.025, backgroundColor: "white", margin: "1%" }}>

                                <View style={{ flex: 0.6, backgroundColor: "transparent" }}>
                                    <Text style={{ fontSize: 15, color: colors.darkBlue }}>{item.orderId}</Text>
                                    <Text style={{ fontSize: 12, color: item.orderStatus == "On its way" ? "orange" : item.orderStatus == "Delivered" ? colors.darkSkyBlue : item.orderStatus == "Cancelled" ? "red" : colors.darkGrey }}>{item.orderStatus}</Text>

                                </View>
                                <View style={{ flex: 0.25, backgroundColor: "transparent" }}>
                                    <Text style={{ fontSize: 15, color: colors.darkBlue, fontWeight: '700' }}>${item.amount}.00</Text>
                                    <Text style={{ fontSize: 12, color: colors.darkGrey }}>{item.orderDate}</Text>
                                </View>

                                <View style={{ flex: 0.15, backgroundColor: "transparent", justifyContent: "center", alignItems: 'flex-end' }}>
                                    <Icon name={'keyboard-arrow-right'} size={30} color={colors.darkGrey} />

                                </View>

                            </TouchableOpacity>
                        )
                    })}

                </ScrollView>
            </View>

        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({getorderList}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: 'yellow',

        justifyContent: 'space-around',
    },
});
