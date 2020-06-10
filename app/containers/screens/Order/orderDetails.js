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


const colors = {

    darkGrey: "#737373",
    lightGrey: "#e5e8e7",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}
export default class OrdersDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allownotifModal: false,
            timerModalFlag: false
        };
    }




    render() {

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ height: deviceHeight, width: deviceWidth, backgroundColor: '#e5e8e7' }}>

                    <View style={{ backgroundColor: "white" }}>

                        <View style={{ backgroundColor: "transparent", margin: '5%', paddingHorizontal: deviceHeight * 0.025, paddingVertical: deviceHeight * 0.025, borderWidth: 0.5, borderColor: "#A5A5A5" }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 0.7 }}>
                                    <Text style={{ fontSize: 13, color: colors.darkGrey, fontWeight: '700' }}>Estimated Arrival</Text>
                                    <Text style={{ fontSize: 20, color: colors.darkBlue, fontWeight: '700' }}>Feb 17,2020</Text>
                                </View>
                                <View style={{ flex: 0.3 }}>
                                    <Icon name={'github'} size={40} />
                                </View>
                            </View>

                            <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.015, paddingTop: deviceHeight * 0.03 }}>
                                <ProgressBar progress={0.3} width={230} color={colors.darkBlue} />
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

                            <Text style={{ fontSize: 13, color: colors.darkBlue }}>Order: #432565</Text>
                            <Text style={{ fontSize: 13, color: colors.darkBlue }}>35.00 KWD (3 items)</Text>

                        </View>

                    </View>

                    <View style={{ paddingVertical: deviceHeight * 0.015, backgroundColor: '#e5e8e7', paddingHorizontal: deviceWidth * 0.03 }}>
                        <Text style={{ fontSize: 13, color: '#8F8F8F', fontWeight: "bold" }}>SHIPPING DETAILS</Text>
                    </View>

                    <View style={{ paddingVertical: deviceHeight * 0.015, backgroundColor: "white", paddingHorizontal: deviceWidth * 0.03 }}>
                        <View style={{ paddingBottom: deviceHeight * 0.015, borderBottomWidth: 0.5, borderColor: "#A5A5A5" }}>
                            <Text style={{ fontSize: 13, color: colors.darkGrey }}>Max Davis</Text>
                            <Text style={{ fontSize: 13, color: colors.darkGrey }}>435 Mariposa Ave, San Bruno, CA 98743</Text>
                        </View>
                        <View style={{ paddingVertical: deviceHeight * 0.015, flexDirection: 'row' }}>
                            <Icon name={'check'} size={20} color={colors.darkSkyBlue} style={{ top: "1%" }} />
                            <Text style={{ fontSize: 20, color: colors.darkBlue, fontWeight: "bold", left: "15%" }}>Shipped</Text>
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
                    </View>

                    <View style={{ marginTop: deviceHeight * 0.02, backgroundColor: "white", paddingHorizontal: deviceWidth * 0.03 }}>
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
                    </View>

                    <View style={{ paddingVertical: deviceHeight * 0.015, backgroundColor: "#e5e8e7", paddingHorizontal: deviceWidth * 0.03 }}>
                        <Text style={{ fontSize: 13, color: '#8F8F8F', fontWeight: "bold" }}>DELIVERY DETAILS</Text>
                    </View>
                    <View style={{ paddingVertical: deviceHeight * 0.015, paddingHorizontal: deviceWidth * 0.03, backgroundColor: "white" }}>
                        <Text style={{ fontSize: 13, color: colors.darkGrey }}>First Last name</Text>
                        <Text style={{ fontSize: 13, color: colors.darkGrey }}>435 Mariposa Ave, San Bruno, CA 98743</Text>
                    </View>

                    <View style={{ paddingVertical: deviceHeight * 0.015, backgroundColor: "#e5e8e7", paddingHorizontal: deviceWidth * 0.03 }}>
                        <Text style={{ fontSize: 13, color: '#8F8F8F', fontWeight: "bold" }}>BILLING INFO</Text>
                    </View>
                    <View style={{ paddingVertical: deviceHeight * 0.015, paddingHorizontal: deviceWidth * 0.03, backgroundColor: "white" }}>
                        <Text style={{ fontSize: 13, color: colors.darkGrey }}>First Last name</Text>
                        <Text style={{ fontSize: 13, color: colors.darkGrey }}>435 Mariposa Ave, San Bruno, CA 98743</Text>
                        <View style={{ flexDirection: "row", paddingLeft: "5%", paddingVertical: "1%" }}>

                            <View style={{}}>
                                <CardIcon name={'cc-mastercard'} size={20} style={{ paddingHorizontal: "2%" }} />
                            </View>
                            <View style={{}}>
                                <Text style={{ fontSize: 13, color: "#9B9B9B" }}>Payment Method VISA</Text>
                                <Text style={{ fontSize: 13, color: "#9B9B9B" }}>XXXX-XXXX-XXXX-3546</Text>
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
                                <Text style={{ fontSize: 13, color: '#9B9B9B', fontWeight: "700" }}>200 KWD</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ fontSize: 13, color: '#9B9B9B' }}>Shipping</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                <Text style={{ fontSize: 13, color: '#9B9B9B', fontWeight: "700" }}>200 KWD</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ fontSize: 13, color: '#9B9B9B' }}>Estimated Sales Tax</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                <Text style={{ fontSize: 13, color: '#9B9B9B', fontWeight: "700" }}>0.00 KWD</Text>
                            </View>
                        </View>
                        <View style={{ paddingVertical: deviceHeight * 0.032, backgroundColor: "transparent", flexDirection: "row" }}>

                            <View style={{ flex: 0.5 }}>
                                <Text style={{ fontSize: 13, color: '#9B9B9B' }}>Order Total</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                <Text style={{ fontSize: 13, color: colors.darkBlue, fontWeight: '700' }}>45.500 KWD</Text>
                            </View>

                        </View>
                    </View>
                </ScrollView>

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

                <Modal isVisible={this.state.timerModalFlag}
                    style={styles.timermodal}
                >

                    <View style={{ top: deviceHeight * 0.4, backgroundColor: "white", flex: 1 }}>
                        <View style={{ flex: 0.05, backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.06, alignItems: "flex-end", justifyContent: "center",top:"1%" }}>
                            <Icon onPress={() => this.setState({ timerModalFlag: false })} name={'close'} size={28} />
                        </View>
                        <View style={{ flex: 0.3, backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.06,justifyContent:"flex-end",alignItems:"center" }}>
                            <Text style={{ fontSize: 28, color: "#003A51", fontWeight: "700" }}>Tracking your order</Text>
                            <View style={{ backgroundColor: "transparent", flexDirection: "row",paddingTop:deviceHeight*0.03 }}>
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

    }
});