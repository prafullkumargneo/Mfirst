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
import Icon from 'react-native-vector-icons/MaterialIcons';


const colors = {

    darkGrey: "#737373",
    lightGrey: "#e5e8e7",
    darkBlue: "#003A52",
    darkSkyBlue: "#3FC1C9",

}
export default class FavoriteOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }




    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#e5e8e7' }}>
                <ScrollView style={{ height: deviceHeight, backgroundColor: '#e5e8e7' }}>

                    <View  style={{ paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceHeight * 0.025, backgroundColor: "white", margin: "1%" }}>

                        <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
                            <View style={{ backgroundColor: "transparent" }}>
                                <Image style={{ height: 93, width: 93 }} source={{ uri: "https://picsum.photos/200" }} />
                            </View>
                            <View style={{ backgroundColor:"transparent",width:deviceWidth*0.67,paddingHorizontal:deviceWidth*0.05 }}>
                                <View style={{ backgroundColor: "#E9F8FB", paddingVertical: deviceHeight * 0.005, borderRadius: 20, justifyContent: "center", alignItems: "center",width:deviceWidth*0.25 }}>
                                    <Text style={{ color: colors.darkSkyBlue, fontSize: 13 }}>Best selling</Text>
                                </View>
                                <Text style={{ color: colors.darkBlue, fontSize: 14, paddingVertical: deviceHeight * 0.01 }}>new baby item </Text>
                                <Text style={{ color: colors.darkBlue, fontSize: 14, fontWeight: "bold" }}>77.500 KWD</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: colors.darkGrey, fontSize: 13, textDecorationLine: "line-through" }}>12.00 KWD</Text>
                                    <Text style={{ color: colors.darkSkyBlue, fontSize: 13, paddingLeft: "4%" }}>30% OFF</Text>
                                </View>

                            </View>
                        </View>
                        <View style={{ flexDirection: "row", backgroundColor: "transparent", paddingTop: deviceHeight * 0.02 }}>
                            <View style={{ flex: 0.45, backgroundColor: "transparent", alignItems: "flex-end" }}>
                                <Text style={{ color: colors.darkBlue, fontSize: 13, textDecorationLine: "underline" }}>Remove</Text>
                            </View>
                            <View style={{ flex: 0.55, backgroundColor: "transparent", alignItems: "flex-end",paddingHorizontal:deviceWidth*0.01 }}>
                                <TouchableOpacity  style={{ backgroundColor: colors.darkSkyBlue, alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.01,paddingHorizontal:deviceWidth*0.035 }}>

                                    <Text style={{ fontSize: 13, color: "white" }}>Add to cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>


                    <View  style={{ paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceHeight * 0.025, backgroundColor: "white", margin: "1%" }}>

                        <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
                            <View style={{ backgroundColor: "transparent" }}>
                                <Image style={{ height: 93, width: 93 }} source={{ uri: "https://picsum.photos/200" }} />
                            </View>
                            <View style={{ backgroundColor:"transparent",width:deviceWidth*0.67,paddingHorizontal:deviceWidth*0.05 }}>
                                <View style={{ backgroundColor: "#E9F8FB", paddingVertical: deviceHeight * 0.005, borderRadius: 20, justifyContent: "center", alignItems: "center",width:deviceWidth*0.25 }}>
                                    <Text style={{ color: colors.darkSkyBlue, fontSize: 13 }}>Best selling</Text>
                                </View>
                                <Text style={{ color: colors.darkBlue, fontSize: 14, paddingVertical: deviceHeight * 0.01 }}>new baby item </Text>
                                <Text style={{ color: colors.darkBlue, fontSize: 14, fontWeight: "bold" }}>77.500 KWD</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: colors.darkGrey, fontSize: 13, textDecorationLine: "line-through" }}>12.00 KWD</Text>
                                    <Text style={{ color: colors.darkSkyBlue, fontSize: 13, paddingLeft: "4%" }}>30% OFF</Text>
                                </View>

                            </View>
                        </View>
                        <View style={{ flexDirection: "row", backgroundColor: "transparent", paddingTop: deviceHeight * 0.02 }}>
                            <View style={{ flex: 0.45, backgroundColor: "transparent", alignItems: "flex-end" }}>
                                <Text style={{ color: colors.darkBlue, fontSize: 13, textDecorationLine: "underline" }}>Remove</Text>
                            </View>
                            <View style={{ flex: 0.55, backgroundColor: "transparent", alignItems: "flex-end",paddingHorizontal:deviceWidth*0.01 }}>
                                <TouchableOpacity  style={{ backgroundColor: colors.darkSkyBlue, alignItems: "center", justifyContent: "center", borderRadius: 20, paddingVertical: deviceHeight * 0.01,paddingHorizontal:deviceWidth*0.035 }}>

                                    <Text style={{ fontSize: 13, color: "white" }}>Add to cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </ScrollView>
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
