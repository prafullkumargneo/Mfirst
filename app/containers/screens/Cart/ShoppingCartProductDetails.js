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
    FlatList, ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from 'react-navigation-drawer';
import Image from 'react-native-image-progress';
import { RNToasty } from 'react-native-toasty';
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
import DeliveryIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import getCartProduct from '../../../actions/CartActions/getCartProductActions';
import addToCart from '../../../actions/CartActions/addToCartActions';

class ShoppingCartProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productQuantity: null,
            orderId: null,
            userId: null
        };
    }

    componentDidMount() {

        this.setState({ productQuantity: this.props.productDetailsData && this.props.productDetailsData.productQty })

    }


    async setProductQuantity(productData, userId,status,orderId ) {
        let cartData = {
            userId: userId,
            productId: productData,
            addQty: status == "increase" ? this.state.productQuantity + 1 : status == "decrease" ? this.state.productQuantity - 1 : status == "removeProduct" ? this.state.productQuantity : null
        }
        this.props.addToCart(cartData,orderId, status)
        await this.quantityResponse()
    }


    quantityResponse() {

        if (this.props.addToCartReducer && this.props.addToCartReducer.addToCartError) {
            RNToasty.Error({
                title: "Something went wrong.Please try again.",
                titleSize: 15
            })
            this.setState({ productQuantity: this.state.productQuantity })
        }

    }

    increaseProduct(productData, userId) {
        console.log("productQuantity", this.state.productQuantity)
        this.setState({ productQuantity: this.state.productQuantity + 1 })
        this.setProductQuantity(productData, userId, "increase",null)

    }

    decreaseProduct(productData, userId) {
        if (this.state.productQuantity <= 1) {
            RNToasty.Error({
                title: "Item Should not be less than 1.",
                titleSize: 15
            })
        }
        else {
            this.setState({ productQuantity: this.state.productQuantity <= 1 ? 1 : this.state.productQuantity - 1 })
            this.setProductQuantity(productData, userId, "decrease",null)
        }

    }

    removeProduct(productData, userId,orderId) {
        Alert.alert(
            "Remove",
            "Are you sure you want to remove product from cart.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        this.setState({ productQuantity: 0 })
                        this.setProductQuantity(productData, userId,"removeProduct",orderId )
                    }
                }
            ],
            { cancelable: false }
        );

    }

    render() {
        console.log("productDetailsData", this.props.productDetailsData)
        let productData = this.props.productDetailsData
        let userId = this.props.userId
        let orderId= this.props.orderId

        return (

            <View style={{ width: deviceWidth * 0.71, backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.05 }}>
                <View style={{ paddingVertical: deviceHeight * 0.04, backgroundColor: "transparent", flexDirection: "row" }}>

                    <View style={{ backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.02 }}>
                        <Image style={{ height: 97, width: 97 }} source={{ uri: productData && productData.productImage }} />
                    </View>
                    <View style={{ backgroundColor: "transparent", paddingLeft: deviceWidth * 0.04 }}>

                        <Text style={{ color: "#2B2B2B", fontSize: 14, fontWeight: "700" }}>{productData && productData.productName}</Text>
                        <Text style={{ color: "#2B2B2B", fontSize: 14 }}>Electric pump and pool detail</Text>
                        <Text style={{ fontSize: 16, paddingTop: "8%", color: "#003351", fontWeight: "bold" }}>{productData && productData.productPrice} KWD</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "#A5A5A5", fontSize: 13, textDecorationLine: "line-through" }}>4400 KWD  </Text>
                            <Text style={{ color: "#3FC1C9", fontSize: 13 }}>30% OFF</Text>
                        </View>

                    </View>

                </View>

                <View style={{ paddingBottom: deviceHeight * 0.02, backgroundColor: "transparent", flexDirection: "row" }}>

                    <View style={{ backgroundColor: "transparent", flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => { this.decreaseProduct(productData.productId, userId) }} style={{ backgroundColor: "white", borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderColor: "#CCCCCC", borderWidth: 1, paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceHeight * 0.01 }}>
                            <Text style={{ color: "#A5A5A5", fontSize: 13, fontWeight: "700" }}>-</Text>
                        </TouchableOpacity>

                        <View style={{ backgroundColor: "white", paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceHeight * 0.01, borderColor: "#CCCCCC", borderWidth: 1, paddingBottom: 1 }}>
                            <Text>{this.state.productQuantity}</Text>
                        </View>

                        <TouchableOpacity onPress={() => { this.increaseProduct(productData.productId, userId) }} style={{ backgroundColor: "white", borderTopRightRadius: 20, borderColor: "#CCCCCC", borderWidth: 1, borderBottomRightRadius: 20, paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceHeight * 0.01 }}>
                            <Text style={{ color: "#003351", fontSize: 13, fontWeight: "700" }}>+</Text>

                        </TouchableOpacity>

                    </View>

                    <View style={{ backgroundColor: "white", justifyContent: "center", paddingLeft: deviceWidth * 0.4 }}>
                    <TouchableOpacity onPress={() => { this.removeProduct(productData.productId, userId,orderId) }}>
                        <Text  style={{ textDecorationLine: "underline", fontSize: 13, color: "#003351", fontWeight: "700" }}>Remove</Text>
                        </TouchableOpacity>
                    </View>

                </View>


            </View>
        );
    }

}

function mapStateToProps(state) {
    return {
        addToCartReducer: state.addToCartReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ addToCart }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartProductDetails)

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: 'yellow',

        justifyContent: 'space-around',
    },
});
