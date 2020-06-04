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
    FlatList, Image,
    TouchableOpacity
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
import Modal from 'react-native-modal';
import { RNToasty } from 'react-native-toasty';

const colors = {

    darkGrey: "#737373",
    lightGrey: "#e5e8e7",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}

export default class GiftWrapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            giftWrapping: false,
            addColor: colors.lightGrey,
            isGiftWrappingModal: false,
            addWrappingPaperData: false,
            wholeGiftWrappingDataStatus: 'confirm'
        };
    }


    giftWrapping() {

        this.setState({ giftWrapping: !this.state.giftWrapping, })

        if (!this.state.giftWrapping) {
            this.setState({ isGiftWrappingModal: true, addWrappingPaperData: false })
        }

    }

    wholeGiftWrapData(status) {

        if (status === 'cancel') {
            this.setState({ giftWrapping: false, wholeGiftWrappingDataStatus: status })
        }
        else {
            this.setState({ wholeGiftWrappingDataStatus: status })
            RNToasty.Success({
                title: "Success.",
                titleSize: 15
            })
        }

    }

    addWrappingPaperDetails() {


        if (this.state.addWrappingPaperData) {
            this.setState({ isGiftWrappingModal: false })
        } else {
            RNToasty.Error({
                title: "Select atleast one item.",
                titleSize: 15
            })
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: !this.state.giftWrapping ? 1 : 0.9 }}>

                    <ScrollView contentContainerStyle={{ height: deviceHeight, width: deviceWidth, backgroundColor: "white" }}>

                        <View style={{ backgroundColor: "transparent" }}>

                            <View style={{ paddingHorizontal: deviceWidth * 0.03, backgroundColor: "transparent", flexDirection: "row", paddingVertical: deviceHeight * 0.015, borderWidth: 0.5, borderColor: "#A5A5A5" }}>

                                <View style={{ flex: 0.6, backgroundColor: "white" }}>
                                    <Text style={{ fontSize: 14, color: "#737373", fontWeight: "700" }}>SELECT GIFT WRAP</Text>
                                </View>
                                <View style={{ justifyContent: "flex-end", alignItems: "flex-end", flex: 0.4 }}>
                                    <Text style={{ fontSize: 14, color: "#003A52", fontWeight: "700" }}>0.00 KWD</Text>
                                </View>

                            </View>

                            <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.025, paddingHorizontal: deviceWidth * 0.03 }}>

                                <TouchableOpacity onPress={() => { this.giftWrapping() }} style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.01 }}>
                                    {this.state.giftWrapping ? <Icon name={'check-circle'} size={30} color={"#3FC1C9"} /> : <Icon name={'circle-outline'} size={30} color={"#3FC1C9"} />}
                                    <Image style={{ height: 97, width: 122, left: deviceWidth * 0.07, }} source={{ uri: "https://picsum.photos/200" }} />
                                </TouchableOpacity>

                                <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.015, paddingLeft: deviceWidth * 0.07 }}>
                                    <Text style={{ fontSize: 15, color: "#737373", fontWeight: "700" }}>Gift wrap</Text>
                                    <Text style={{ fontSize: 14, color: "#003A52", fontWeight: "700" }}>8.500 KWD</Text>
                                </View>

                            </View>


                        </View>


                        <View style={{ backgroundColor: 'transparent' }}>

                            <View style={{ paddingHorizontal: deviceWidth * 0.03, backgroundColor: "transparent", flexDirection: "row", paddingVertical: deviceHeight * 0.015, borderBottomWidth: 0.5, borderColor: "#A5A5A5" }}>

                                <View style={{ flex: 0.6, backgroundColor: "transparent" }}>
                                    <Text style={{ fontSize: 14, color: this.state.giftWrapping ? colors.darkGrey : colors.lightGrey, fontWeight: "700" }}>ADD MESSAGE</Text>
                                </View>
                                <View style={{ justifyContent: "flex-end", alignItems: "flex-end", flex: 0.4 }}>
                                    <Text style={{ fontSize: 14, color: this.state.giftWrapping ? colors.darkBlue : colors.lightGrey, fontWeight: "700" }}>0.00 KWD</Text>
                                </View>

                            </View>

                            <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.032, paddingHorizontal: deviceWidth * 0.03 }}>

                                <View style={{ backgroundColor: "transparent", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>

                                    <View style={{ backgroundColor: "transparent" }}>
                                        <Icon name={'message-text-outline'} size={35} color={this.state.giftWrapping ? colors.darkBlue : colors.lightGrey} />
                                    </View>
                                    <View style={{ backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.05 }}>
                                        <Text style={{ fontSize: 15, color: this.state.giftWrapping ? colors.darkGrey : colors.lightGrey, fontWeight: "700" }}>Your message card</Text>
                                        <Text style={{ fontSize: 14, color: this.state.giftWrapping ? colors.darkBlue : colors.lightGrey, fontWeight: "700" }}>Free or premium</Text>
                                    </View>

                                </View>

                                <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.03, paddingHorizontal: deviceWidth * 0.1 }}>
                                    <TouchableOpacity disabled={!this.state.giftWrapping} style={{ flexDirection: "row", backgroundColor: "transparent", alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.01, borderWidth: 1.5, borderColor: this.state.giftWrapping ? colors.darkBlue : colors.lightGrey }}>

                                        <Text style={{ fontSize: 15, color: this.state.giftWrapping ? colors.darkBlue : colors.lightGrey, fontWeight: "700" }}>Add a new message card</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>


                        </View>

                        <View style={{ backgroundColor: "transparent" }}>

                            <View style={{ paddingHorizontal: deviceWidth * 0.03, backgroundColor: "transparent", flexDirection: "row", paddingVertical: deviceHeight * 0.015, borderBottomWidth: 0.5, borderColor: "#A5A5A5" }}>

                                <View style={{ flex: 0.6, backgroundColor: "transparent" }}>
                                    <Text style={{ fontSize: 14, color: this.state.giftWrapping ? colors.darkGrey : colors.lightGrey, fontWeight: "700" }}>ADD-ONS</Text>
                                </View>
                                <View style={{ justifyContent: "flex-end", alignItems: "flex-end", flex: 0.4 }}>
                                    <Text style={{ fontSize: 14, color: this.state.giftWrapping ? colors.darkBlue : colors.lightGrey, fontWeight: "700" }}>0.00 KWD</Text>
                                </View>

                            </View>

                            <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.03, paddingHorizontal: deviceWidth * 0.03, flexDirection: "row" }}>

                                <TouchableOpacity disabled={!this.state.giftWrapping} style={{ backgroundColor: "transparent" }}>
                                    <Icon name={'circle-outline'} size={30} color={this.state.giftWrapping ? colors.darkSkyBlue : colors.lightGrey} />
                                </TouchableOpacity>
                                <View style={{ backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceHeight * 0.02 }}>
                                    <Image style={{ height: 60, width: 60 }} source={{ uri: "https://picsum.photos/200" }} />
                                </View>

                                <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.02 }}>
                                    <Text style={{ fontSize: 15, color: this.state.giftWrapping ? colors.darkGrey : colors.lightGrey, fontWeight: "700" }}>Your ballons</Text>
                                    <Text style={{ fontSize: 14, color: this.state.giftWrapping ? colors.darkBlue : colors.lightGrey, fontWeight: "700" }}>8.500 KWD</Text>
                                </View>

                            </View>


                        </View>


                    </ScrollView>
                </View>
                {
                    this.state.giftWrapping ?
                        <View style={{ flex: 0.1, backgroundColor: "transparent", flexDirection: "row", borderTopWidth: 0.5, borderColor: "#A5A5A5" }}>

                            <View style={{ flex: 0.5, justifyContent: "center", paddingHorizontal: deviceWidth * 0.09 }}>
                                <TouchableOpacity onPress={() => this.wholeGiftWrapData("cancel")} style={{ flexDirection: "row", backgroundColor: this.state.wholeGiftWrappingDataStatus === 'cancel' ? colors.darkSkyBlue : 'transparent', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.01 }}>
                                    <Text style={{ fontSize: 15, color: colors.darkBlue, fontWeight: "700" }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: "center", paddingHorizontal: deviceWidth * 0.09 }}>
                                <TouchableOpacity onPress={() => this.wholeGiftWrapData("confirm")} style={{ flexDirection: "row", backgroundColor: this.state.wholeGiftWrappingDataStatus === 'confirm' ? colors.darkSkyBlue : 'transparent', alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.01 }}>
                                    <Text style={{ fontSize: 15, color: this.state.wholeGiftWrappingDataStatus === 'confirm' ? "white" : colors.darkBlue, fontWeight: "700" }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        : null

                }

                <Modal isVisible={this.state.isGiftWrappingModal}
                    style={styles.modal}
                >


                    <View style={{ flex: 0.07, backgroundColor: "white", flexDirection: "row", paddingHorizontal: deviceWidth * 0.06 }}>
                        <View style={{ flex: 0.8, justifyContent: "center" }}>
                            <Text style={{ fontSize: 14, color: colors.darkGrey, fontWeight: '700' }}>Add Wrapping Paper</Text>
                        </View>
                        <View style={{ flex: 0.2, backgroundColor: "transparent", flexDirection: "row-reverse", justifyContent: "center" }}>
                            <Icon onPress={() => { this.setState({ isGiftWrappingModal: false, giftWrapping: false }) }} name={'close'} size={23} color={colors.darkGrey} style={{ alignSelf: "center" }} />
                        </View>
                    </View>

                    <View style={{ flex: 0.93 }}>
                        <ScrollView contentContainerStyle={{ height: deviceHeight }}>
                            <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.04, justifyContent: "center", alignItems: "center" }}>
                                <Image style={{ height: 136, width: 181 }} source={{ uri: "https://picsum.photos/200" }} />
                            </View>

                            <View style={{ paddingHorizontal: deviceWidth * 0.06, backgroundColor: "transparent" }}>

                                <View style={{ paddingVertical: deviceHeight * 0.02, backgroundColor: "transparent" }}>
                                    <Text style={{ fontSize: 14, color: colors.darkGrey, fontWeight: '700' }}>SELECT AT LEAST ONE ITEM FROM</Text>
                                </View>
                                {/* item map listing is to be done in view */}
                                <View style={{ paddingVertical: deviceHeight * 0.005 }}>
                                    <TouchableOpacity onPress={() => { this.setState({ addWrappingPaperData: true }) }} style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.01 }}>
                                        {this.state.addWrappingPaperData ? <Icon name={'check-circle'} size={30} color={"#3FC1C9"} /> : <Icon name={'circle-outline'} size={30} color={"#3FC1C9"} />}
                                        <Image style={{ height: 97, width: 122, left: deviceWidth * 0.07, }} source={{ uri: "https://picsum.photos/200" }} />
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: "transparent", paddingVertical: deviceHeight * 0.015, paddingLeft: deviceWidth * 0.09 }}>
                                        <Text style={{ fontSize: 15, color: "#737373", fontWeight: "700" }}>Gift wrap</Text>

                                    </View>

                                </View>

                            </View>

                            <View style={{ backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.28, paddingVertical: deviceHeight * 0.04, left: "20%" }}>

                                <TouchableOpacity onPress={() => this.addWrappingPaperDetails()} style={{ flexDirection: "row", backgroundColor: colors.darkSkyBlue, alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.01 }}>

                                    <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>Confirm</Text>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
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
        backgroundColor: "white",
        top: deviceHeight * 0.2,


    }
});
