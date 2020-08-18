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
    FlatList, TouchableOpacity, Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from 'react-navigation-drawer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _Input from '../../../components/Input/_Input';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _Header from '../../../components/Header/_MainHeader';
import { deviceWidth, deviceHeight } from '../../../constants/globals';
import DummyJSON from "../../../lib/dummyJson";
import appStyles from '../../../constants/appStyle';
import NavService from '../../navigators/navigationService';
import Icon from 'react-native-vector-icons/AntDesign';
import CardIcon from 'react-native-vector-icons/FontAwesome';
import NotifIcon from 'react-native-vector-icons/MaterialIcons';
import DeliveryIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from 'react-native-progress/Bar';
import Modal from 'react-native-modal'
import CountDown from 'react-native-countdown-component';
import orderDetails from "../../../actions/OrderActions/orderDetailsActions";


const colors = {

    darkGrey: "#737373",
    lightGrey: "#e5e8e7",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}
class OrdersDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allownotifModal: false,
            timerModalFlag: false
        };
    }

    async componentDidMount() {

        await this.fetchOrderDetails()

    }

    async fetchOrderDetails() {
        const { params } = this.props.navigation.state;
        let orderDetailsData = {
            orderId: params.orderId,
            userId: params.userId
        }
        this.props.orderDetails(orderDetailsData)
        console.log("params in order details navigation", params)
    }

    retryOrderDetails() {
        this.fetchOrderDetails()
    }

    productDetails(item, index) {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.25, backgroundColor: "transparent", paddingLeft: "3%" }}>
                    <Image style={{ height: 65, width: 65 }} source={{ uri: "https://picsum.photos/200" }} />

                </View>
                <View style={{ flex: 0.5, backgroundColor: "transparent" }}>
                    <Text style={{ fontSize: 15, color: colors.darkGrey }}>{item.productName}</Text>
                </View>
                <View style={{ flex: 0.25, backgroundColor: "transparent", alignItems: "flex-end" }}>
                    <Text style={{ fontSize: 14, color: colors.darkBlue, fontWeight: "bold" }}>{item.productAmount} {this.props.orderDetailsReducer.orderDetailsData.currency}</Text>
                </View>
            </View>
        )

    }

    toggleModel(){
        this.setState({ timerModalFlag: true})
    }

    render() {
        console.log("this.props.orderDetailsReducer", this.props.orderDetailsReducer)
        if (this.props.orderDetailsReducer.orderDetailsLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#e5e8e7', justifyContent: 'center', alignItems: "center" }}>
                    <Image source={require("../../../assets/images/gifloader.gif")} />
                </View>
            )
        }
        else {
            let orderDetailsData = this.props.orderDetailsReducer.orderDetailsData
            return (
                <View style={{ flex: 1 }}>
                    {
                        this.props.orderDetailsReducer.orderDetailsData ?
                            <ScrollView style={{ height: deviceHeight, width: deviceWidth, backgroundColor: '#e5e8e7' }}>

                                <View style={{ backgroundColor: "white" }}>

                                    <View style={{ backgroundColor: "transparent", margin: '5%', paddingHorizontal: deviceHeight * 0.025, paddingVertical: deviceHeight * 0.025, borderWidth: 0.5, borderColor: "#A5A5A5" }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 0.7 }}>
                                                <Text style={{ fontSize: 13, color: colors.darkGrey, fontWeight: '700' }}>Estimated Arrival</Text>
                                                <Text style={{ fontSize: 20, color: colors.darkBlue, fontWeight: '700' }}>{orderDetailsData.date}</Text>
                                            </View>
                                            <View style={{ flex: 0.3 }}>
                                                <Icon name={'github'} size={40} />
                                            </View>
                                        </View>

                                        <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.015, paddingTop: deviceHeight * 0.03 }}>
                                            <ProgressBar progress={orderDetailsData.orderProgressStatus} width={230} color={colors.darkBlue} />
                                        </View>
                                        <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.01 }}>
                                            <Text style={{ fontSize: 13, color: colors.darkSkyBlue }}>Part of your order is arriving soon.</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => this.setState({ allownotifModal: !this.state.allownotifModal })} style={{ backgroundColor: colors.darkSkyBlue, marginHorizontal: deviceWidth * 0.045, flexDirection: "row", paddingVertical: deviceHeight * 0.025, borderRadius: 6 }}>

                                        <View style={{ flex: 0.3, backgroundColor: "transparent", justifyContent: "center", alignItems: "center" }}>
                                            <NotifIcon name={'notifications-active'} size={50} color={'white'} />
                                        </View>
                                        <View style={{ flex: 0.7, paddingHorizontal: "5%" }}>
                                            <Text style={{ fontSize: 18, color: "white", fontWeight: '700' }}>Allow Notifications</Text>
                                            <Text style={{ fontSize: 13, color: 'white', paddingTop: "2%" }}>And get real time updates on your order</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.047, paddingVertical: deviceHeight * 0.02 }}>

                                        <Text style={{ fontSize: 13, color: colors.darkBlue }}>Order: #{orderDetailsData.orderId}</Text>
                                        <Text style={{ fontSize: 13, color: colors.darkBlue }}>{orderDetailsData.amountTotal} {orderDetailsData.currency}</Text>

                                    </View>

                                </View>

                                <View style={{ paddingVertical: deviceHeight * 0.015, backgroundColor: '#e5e8e7', paddingHorizontal: deviceWidth * 0.03 }}>
                                    <Text style={{ fontSize: 13, color: '#8F8F8F', fontWeight: "bold" }}>SHIPPING DETAILS</Text>
                                </View>

                                <View style={{ paddingVertical: deviceHeight * 0.015, backgroundColor: "white", paddingHorizontal: deviceWidth * 0.03 }}>
                                    <View style={{ paddingBottom: deviceHeight * 0.015, borderBottomWidth: 0.5, borderColor: "#A5A5A5" }}>
                                        {orderDetailsData.shippingAddress && <Text style={{ fontSize: 13, color: colors.darkGrey }}>{orderDetailsData.shippingAddress.street} {orderDetailsData.shippingAddress.street2}</Text>}
                                        {orderDetailsData.shippingAddress && <Text style={{ fontSize: 13, color: colors.darkGrey }}>{orderDetailsData.shippingAddress.city} {orderDetailsData.shippingAddress.state} {orderDetailsData.shippingAddress.country} {orderDetailsData.shippingAddress.zip}</Text>}
                                    </View>
                                    <View style={{ paddingVertical: deviceHeight * 0.015, flexDirection: 'row' }}>
                                        <Icon name={'check'} size={20} color={colors.darkSkyBlue} style={{ top: "1%" }} />
                                        <Text style={{ fontSize: 20, color: colors.darkBlue, fontWeight: "bold", left: "15%" }}>Shipped</Text>
                                    </View>
                                    <View style={{ paddingVertical: deviceHeight * 0.015, flexDirection: 'row', backgroundColor: 'transparent', borderBottomWidth: 0.5, borderColor: "#A5A5A5" }}>
                                        {
                                            orderDetailsData.productDetails ?
                                                orderDetailsData.productDetails.map((item, index) => {
                                                    return (
                                                        this.productDetails(item, index)
                                                    )
                                                })
                                                :
                                                null
                                        }
                                        {/* <View style={{ flex: 0.25, backgroundColor: "transparent", paddingLeft: "3%" }}>
                                            <Image style={{ height: 65, width: 65 }} source={{ uri: "https://picsum.photos/200" }} />

                                        </View>
                                        <View style={{ flex: 0.5, backgroundColor: "transparent" }}>
                                            <Text style={{ fontSize: 15, color: colors.darkGrey }}>Pant shirt piece cotton discount</Text>
                                        </View>
                                        <View style={{ flex: 0.25, backgroundColor: "transparent", alignItems: "flex-end" }}>
                                            <Text style={{ fontSize: 14, color: colors.darkBlue, fontWeight: "bold" }}>23.100 KWD</Text>
                                        </View> */}
                                    </View>
                                    <View style={{ paddingVertical: deviceHeight * 0.02, flexDirection: 'row', backgroundColor: 'transparent', paddingHorizontal: deviceHeight * 0.06 }}>
                                        <TouchableOpacity onPress={() => this.toggleModel()} style={{ flexDirection: "row", backgroundColor: "transparent", alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.01, borderWidth: 1.5, borderColor: "#003A51", paddingHorizontal: deviceWidth * 0.25 }}>
                                            <Text style={{ fontSize: 15, color: "#003A51", fontWeight: "700" }}>Track Order</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* <View style={{ marginTop: deviceHeight * 0.02, backgroundColor: "white", paddingHorizontal: deviceWidth * 0.03 }}>
                                <View style={{ paddingVertical: deviceHeight * 0.015, borderBottomWidth: 0.5, borderColor: "#A5A5A5" }}>
                                    <Text style={{ fontSize: 13, color: colors.darkGrey }}>First Last name</Text>
                                    <Text style={{ fontSize: 13, color: colors.darkGrey }}>435 Mariposa Ave, San Bruno, CA 98743</Text>
                                </View>
                                <View style={{ paddingVertical: deviceHeight * 0.015, flexDirection: 'row' }}>
                                    <Icon name={'check'} size={20} color={colors.darkSkyBlue} style={{ top: "1%" }} />
                                    <Text style={{ fontSize: 20, color: colors.darkBlue, fontWeight: "bold", left: "15%" }}>Delivered</Text>
                                </View>
                                <View style={{ paddingVertical: deviceHeight * 0.015, flexDirection: 'row', backgroundColor: 'transparent', borderBottomWidth: 0.5, borderColor: "#A5A5A5" }}>
                                    <View style={{ flex: 0.25, backgroundColor: "transparent", paddingLeft: "3%" }}>
                                        <Image style={{ height: 65, width: 65 }} source={{ uri: "https://picsum.photos/200" }} />

                                    </View>
                                    <View style={{ flex: 0.5, backgroundColor: "transparent" }}>
                                        <Text style={{ fontSize: 15, color: colors.darkGrey }}>Pant shirt piece cotton discount</Text>
                                    </View>
                                    <View style={{ flex: 0.25, backgroundColor: "transparent", alignItems: "flex-end" }}>
                                        <Text style={{ fontSize: 14, color: colors.darkBlue, fontWeight: "bold" }}>23.100 KWD</Text>
                                    </View>
                                </View>
                                <View style={{ paddingVertical: deviceHeight * 0.02, flexDirection: 'row', backgroundColor: 'transparent', paddingHorizontal: deviceHeight * 0.06 }}>
                                    <TouchableOpacity onPress={() => this.setState({ timerModalFlag: !this.state.timerModalFlag })} style={{ flexDirection: "row", backgroundColor: "transparent", alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.01, borderWidth: 1.5, borderColor: "#003A51", paddingHorizontal: deviceWidth * 0.25 }}>
                                        <Text style={{ fontSize: 15, color: "#003A51", fontWeight: "700" }}>Track Order</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}

                                <View style={{ paddingVertical: deviceHeight * 0.015, backgroundColor: "#e5e8e7", paddingHorizontal: deviceWidth * 0.03 }}>
                                    <Text style={{ fontSize: 13, color: '#8F8F8F', fontWeight: "bold" }}>DELIVERY DETAILS</Text>
                                </View>
                                <View style={{ paddingVertical: deviceHeight * 0.015, paddingHorizontal: deviceWidth * 0.03, backgroundColor: "white" }}>
                                    {orderDetailsData.shippingAddress && <Text style={{ fontSize: 13, color: colors.darkGrey }}>{orderDetailsData.shippingAddress.street} {orderDetailsData.shippingAddress.street2}</Text>}
                                    {orderDetailsData.shippingAddress && <Text style={{ fontSize: 13, color: colors.darkGrey }}>{orderDetailsData.shippingAddress.city} {orderDetailsData.shippingAddress.state} {orderDetailsData.shippingAddress.country} {orderDetailsData.shippingAddress.zip}</Text>}
                                </View>

                                <View style={{ paddingVertical: deviceHeight * 0.015, backgroundColor: "#e5e8e7", paddingHorizontal: deviceWidth * 0.03 }}>
                                    <Text style={{ fontSize: 13, color: '#8F8F8F', fontWeight: "bold" }}>BILLING INFO</Text>
                                </View>
                                <View style={{ paddingVertical: deviceHeight * 0.015, paddingHorizontal: deviceWidth * 0.03, backgroundColor: "white" }}>
                                    {orderDetailsData.shippingAddress && <Text style={{ fontSize: 13, color: colors.darkGrey }}>{orderDetailsData.shippingAddress.street} {orderDetailsData.shippingAddress.street2}</Text>}
                                    {orderDetailsData.shippingAddress && <Text style={{ fontSize: 13, color: colors.darkGrey }}>{orderDetailsData.shippingAddress.city} {orderDetailsData.shippingAddress.state} {orderDetailsData.shippingAddress.country} {orderDetailsData.shippingAddress.zip}</Text>}
                                    <View style={{ flexDirection: "row", paddingLeft: "5%", paddingVertical: "1%" }}>

                                        <View style={{}}>
                                            <CardIcon name={'cc-mastercard'} size={20} style={{ paddingHorizontal: "2%" }} />
                                        </View>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 13, color: "#9B9B9B" }}>Payment Method {orderDetailsData.paymentAcquirerName}</Text>
                                            <Text style={{ fontSize: 13, color: "#9B9B9B" }}>Reference number {orderDetailsData.paymentRef}</Text>
                                        </View>

                                    </View>
                                </View>

                                <View style={{ paddingVertical: deviceHeight * 0.015, backgroundColor: "#e5e8e7", paddingHorizontal: deviceWidth * 0.03 }}>
                                    <Text style={{ fontSize: 13, color: '#8F8F8F', fontWeight: "bold" }}>ORDER SUMMARY</Text>
                                </View>
                                <View style={{ paddingVertical: deviceHeight * 0.015, borderBottomWidth: 1, paddingHorizontal: deviceWidth * 0.03, backgroundColor: "white" }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={{ fontSize: 13, color: '#9B9B9B' }}>Subtotal</Text>
                                        </View>
                                        <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                            <Text style={{ fontSize: 13, color: '#9B9B9B', fontWeight: "700" }}>{orderDetailsData.amountUntaxed} {orderDetailsData.currency}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={{ fontSize: 13, color: '#9B9B9B' }}>Shipping</Text>
                                        </View>
                                        <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                            <Text style={{ fontSize: 13, color: '#9B9B9B', fontWeight: "700" }}>0 {orderDetailsData.currency}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={{ fontSize: 13, color: '#9B9B9B' }}>Estimated Sales Tax</Text>
                                        </View>
                                        <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                            <Text style={{ fontSize: 13, color: '#9B9B9B', fontWeight: "700" }}>{orderDetailsData.amountTax} {orderDetailsData.currency}</Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingVertical: deviceHeight * 0.032, backgroundColor: "transparent", flexDirection: "row" }}>

                                        <View style={{ flex: 0.5 }}>
                                            <Text style={{ fontSize: 13, color: '#9B9B9B' }}>Order Total</Text>
                                        </View>
                                        <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                            <Text style={{ fontSize: 13, color: colors.darkBlue, fontWeight: '700' }}>{orderDetailsData.amountTax} {orderDetailsData.currency}</Text>
                                        </View>

                                    </View>
                                </View>
                            </ScrollView>
                            :
                            this.props.orderDetailsReducer.orderDetailsError ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ paddingVertical: '3%' }}>Something went wrong ..</Text>
                                    <Text onPress={() => this.retryOrderDetails()} style={{ color: 'skyblue' }}>Retry</Text>
                                </View>
                                :
                                <View style={{ flex: 1, backgroundColor: '#e5e8e7', justifyContent: 'center', alignItems: "center" }}>
                                    <Image source={require("../../../assets/images/gifloader.gif")} />
                                </View>
                    }

                    <Modal isVisible={this.state.allownotifModal}
                        style={styles.modal}
                    >
                        <View style={{ flex: 0.05, backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.06, alignItems: "flex-end", justifyContent: "center" }}>
                            <Icon onPress={() => this.setState({ allownotifModal: false })} name={'close'} size={25} />
                        </View>
                        <View style={{ flex: 0.65, backgroundColor: "transparent", justifyContent: "center", alignItems: "center", paddingHorizontal: deviceWidth * 0.05 }}>
                            <NotifIcon name={'notifications-none'} size={120} color={colors.darkBlue} style={{ paddingVertical: deviceHeight * 0.04 }} />
                            <Text style={{ fontSize: 30, fontWeight: "700", color: colors.darkBlue, textAlign: "center" }}>Get updates on your order status!</Text>
                            <Text style={{ fontSize: 15, color: colors.darkGrey, paddingVertical: deviceHeight * 0.04, textAlign: "center" }}>Allow push notifications to get real time updates on your order status.</Text>

                        </View>
                        <View style={{ flex: 0.3, backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.05 }}>
                            <View style={{ paddingVertical: deviceHeight * 0.03, paddingTop: deviceHeight * 0.1 }}>
                                <TouchableOpacity onPress={() => this.setState({ allownotifModal: false })} style={{ flexDirection: "row", backgroundColor: colors.darkSkyBlue, alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.01 }}>
                                    <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Yes, allow notifications</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ allownotifModal: false })} style={{ flexDirection: "row", backgroundColor: "transparent", alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.01, borderWidth: 1.5, borderColor: "#003A51" }}>
                                <Text style={{ fontSize: 15, color: "#003A51", fontWeight: "700" }}>Don't allow</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <Modal
                        ackdropColor="#B4B3DB"
                        backdropOpacity={0.8}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={600}
                        animationOutTiming={600}
                        backdropTransitionInTiming={600}
                        backdropTransitionOutTiming={600}
                        isVisible={this.state.timerModalFlag}
                        // style={styles.timermodal}
                    >

                        <View style={{ backgroundColor: "white", flex: 1 }}>
                            <View style={{ flex: 0.05, backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.06, alignItems: "flex-end", justifyContent: "center", top: "1%" }}>
                                <Icon onPress={() => this.setState({ timerModalFlag: false })} name={'close'} size={28} />
                            </View>
                            <View style={{ flex: 0.3, backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.06, justifyContent: "flex-end", alignItems: "center" }}>
                                <Text style={{ fontSize: 28, color: "#003A51", fontWeight: "700" }}>Tracking your order</Text>
                                <View style={{ backgroundColor: "transparent", flexDirection: "row", paddingTop: deviceHeight * 0.03 }}>
                                    <DeliveryIcon name={"truck-fast"} size={40} color={"#00333A"} />

                                    <Text style={{ paddingHorizontal: deviceWidth * 0.05, paddingTop: "3%" }}>Your order should be at your location in:</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.65, backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.06 }}>
                                <CountDown
                                    size={30}
                                    until={2000}
                                    onFinish={() => alert('Finished')}
                                    digitStyle={{}}
                                    digitTxtStyle={{ color: colors.darkSkyBlue, fontSize: 45 }}
                                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                    separatorStyle={{ color: '#1CC625' }}
                                    timeToShow={['H', 'M', 'S']}
                                    timeLabels={{ m: null, s: null }}
                                    showSeparator
                                />
                            </View>

                        </View>
                    </Modal>
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        orderDetailsReducer: state.orderDetailsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ orderDetails }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersDetails)

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: 'yellow',

        justifyContent: 'space-around',
    },
    modal: {
        flex: 1,
        backgroundColor: "white"
    },
    timermodal: {
        backgroundColor: "yellow",
        top: deviceHeight * 0.4
    }
});
