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
    FlatList, TouchableOpacity, Image
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
            userId: null
        };
    }

    async componentDidMount() {

        await this.getOrder()

    }

    async getOrder() {
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

    retryOrderList() {
        this.getOrder()

    }
    orderSelected(item, index) {
        let orderSelectedData = {
            orderId: item.orderId,
            userId: this.state.userId
        }
        NavService.navigate('root', 'OrdersDetails', orderSelectedData)
    }

    orderList(item, index) {
        return (
            <TouchableOpacity onPress={() => this.orderSelected(item, index)} key={index} style={{ flexDirection: "row", paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceHeight * 0.025, backgroundColor: "white", margin: "1%" }}>

                <View style={{ flex: 0.65, backgroundColor: "transparent" }}>
                    <Text style={{ fontSize: 15, color: colors.darkBlue }}>Order #{item.orderId}</Text>
                    <Text style={{ fontSize: 12, color: item.orderStatus == "Waiting for Approval" ? "orange" : item.orderStatus == "Delivered" ? colors.darkSkyBlue : item.orderStatus == "Cancelled" ? "red" : colors.darkGrey }}>{item.orderStatus}</Text>

                </View>
                <View style={{ flex: 0.25, backgroundColor: "transparent" }}>
                    <Text style={{ fontSize: 15, color: colors.darkBlue, fontWeight: '700',textAlign:'center' }}>${item.orderTotalAmount}</Text>
                    <Text style={{ fontSize: 12, color: colors.darkGrey }}>{item.orderDate}</Text>
                </View>

                <View style={{ flex: 0.1, backgroundColor: "transparent", justifyContent: "center", alignItems: 'flex-end' }}>
                    <Icon name={'keyboard-arrow-right'} size={30} color={colors.darkGrey} />

                </View>

            </TouchableOpacity>
        )
    }

    render() {

        if (this.props.orderListingReducer.orderListingLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#e5e8e7', justifyContent: 'center', alignItems: "center" }}>
                    <Image source={require("../../../assets/images/gifloader.gif")} />
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, backgroundColor: '#e5e8e7' }}>

                    {
                        this.props.orderListingReducer.orderListingData && this.props.orderListingReducer.orderListingData
                            ?
                            <ScrollView style={{ height: deviceHeight, width: deviceWidth, backgroundColor: '#e5e8e7' }}>

                                {
                                    this.props.orderListingReducer.orderListingData.orderDetails ?
                                        this.props.orderListingReducer.orderListingData.orderDetails.map((item, index) => {
                                            return (
                                                this.orderList(item, index)
                                            )

                                        })
                                        :
                                        <View style={{ paddingHorizontal: "5%", height: deviceHeight, justifyContent: "center" }}>

                                            <Image source={require("../../../assets/images/favourite.gif")} style={{ alignSelf: 'center' }} />
                                            <Text style={{ paddingVertical: '3%', fontSize: 23, color: "#2C2C2C", textAlign: 'center' }}>No orders placed yet.</Text>
                                            <Text style={{ fontSize: 16, color: "#003351", textAlign: 'center' }}>Tap 'Add to cart' button below product to make it as your order'.</Text>
                                        </View>
                                }

                            </ScrollView>
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ paddingVertical: '3%' }}>Something went wrong ..</Text>
                                <Text onPress={() => this.retryOrderList()} style={{ color: 'skyblue' }}>Retry</Text>
                            </View>
                    }
                </View>

            );
        }
    }
}

function mapStateToProps(state) {
    return {
        orderListingReducer: state.orderListingReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ getorderList }, dispatch)
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
