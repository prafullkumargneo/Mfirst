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
    FlatList, Image
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
import Icon from 'react-native-vector-icons/AntDesign';
import DeliveryIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import { RNToasty } from 'react-native-toasty';

export default class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetailFlag: "overview"
        };
    }




    productQualityDescription(item, index) {

        return (

            <View style={{ backgroundColor: item.Qualitycolor, justifyContent: "center", alignItems: "center", borderRadius: 70, paddingHorizontal: 15, padding: 8, marginHorizontal: 4 }}>
                <Text style={{ color: "#2B2B2B", fontSize: 13 }}>{item.QualityDetails}</Text>
            </View>

        )
    }

    ProductOverviewDetail(item, index) {
        return (
            <View style={{ paddingVertical: 7, flexDirection: "row" }}>
                <View style={{ flex: 0.06, top: "1%" }}>
                    <Text style={{ fontSize: 10, color: "#282828", fontWeight: "600" }}>{'\u2B24'}</Text>
                </View>
                <View style={{ flex: 0.94 }}>
                    <Text style={{ fontSize: 15, color: "#282828", fontWeight: "600" }}>{item}</Text>
                </View>

            </View>
        )
    }

    relatedItemList(item, index) {
        return (
            <TouchableOpacity style={{paddingHorizontal:17,backgroundColor:"transparent",width:deviceWidth*0.3}}>

                <View style={{ paddingVertical: 5, backgroundColor: "transparent" }}>
                    <Image style={{ height: 101, width: 72, alignSelf: "center" }} source={{ uri: item.relatedItemImage }} />

                </View>
                <View style={{ paddingVertical: 10, backgroundColor: "transparent" }}>
                    <Text style={{ fontSize: 14, color: "#2B2B2B", paddingVertical: 3, fontWeight: "700" }}>{item.relatedItemDescription}</Text>
                    <Text style={{ fontSize: 14, color: "#003A51", fontWeight: "700" }}>{item.relatedItemcost} KWD</Text>
                </View>
            </TouchableOpacity>

        )

    }

    render() {
        const { params } = this.props.navigation.state;
        console.log("props of discover", params)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor:"transparent" }}>

                <View style={{ flex: 0.9, backgroundColor: "#D8D8D8" }}>
                    <ScrollView style={{ height: deviceHeight, width: deviceWidth }}>

                        <View style={{ backgroundColor: "white", marginBottom: 10 }}>

                            <View style={{ backgroundColor: "white", paddingVertical: 10, paddingHorizontal: 17 }}>
                                <Text style={{ color: "#A5A5A5", fontSize: 14, paddingVertical: 2 }}>{params.categoryTitle}</Text>
                                <Text style={{ color: "#2B2B2B", fontSize: 20 }}>{params.categoryDescription}</Text>
                            </View>

                            <View style={{ backgroundColor: "white", justifyContent: "center", flexDirection: "row" }}>
                                <ScrollView horizontal={true} contentContainerStyle={{ paddingHorizontal: 17,paddingVertical:"2%" }}>
                                    {
                                        params.productQualityDescription.map((item, index) => {

                                            return (
                                                this.productQualityDescription(item, index)
                                            )

                                        })

                                    }
                                </ScrollView>

                            </View>

                            <View style={{ height: deviceHeight * 0.3, backgroundColor: "white" }}>

                                <Swiper style={{}} showsButtons={true}>
                                    <View style={styles.slide1}>
                                        <Image style={{ width: deviceWidth * 1, height: deviceHeight * 0.28 }} source={{ uri: "https://picsum.photos/seed/picsum/200/300" }} />

                                    </View>
                                    <View style={styles.slide2}>
                                        <Image style={{ width: deviceWidth, height: deviceHeight }} source={{ uri: "https://i.picsum.photos/id/631/200/300.jpg" }} />
                                    </View>
                                    <View style={styles.slide3}>
                                        <Image style={{ width: deviceWidth * 0.97, height: deviceHeight * 0.2 }} source={{ uri: "https://picsum.photos/id/870/200/300?grayscale&blur=2" }} />

                                    </View>
                                </Swiper>
                                <View style={{ position: "absolute", backgroundColor: "transparent", top: deviceHeight * 0.24, alignSelf: "flex-end", right: "6%" }}>
                                    <Icon name={"hearto"} size={25} />
                                </View>

                            </View>

                            <View style={{ flexDirection: "row", backgroundColor: "transparent", paddingHorizontal: 17, paddingVertical: 15, borderWidth: 0.5, borderColor: "#A5A5A5" }}>

                                <View style={{ flex: 0.2, backgroundColor: "transparent", justifyContent: "center", }}>
                                    <DeliveryIcon name={"truck-fast"} size={40} color={"#00333A"} />
                                </View>
                                <View style={{ flex: 0.8, justifyContent: "center", paddingHorizontal: 24 }}>
                                    <Text style={{ fontSize: 15, }}>Fast delivery within <Text style={{ color: "#16A8B1", fontSize: 15 }}>4 hrs</Text> if you order today by 8PM</Text>
                                </View>

                            </View>

                        </View>

                        <View style={{ backgroundColor: "white" }}>

                            <View style={{ height: deviceHeight * 0.05, backgroundColor: "transparent", flexDirection: "row", borderWidth:0.5,borderColor: "#A5A5A5" }}>

                                <View style={{ flex: 0.33, backgroundColor: "transparent", justifyContent: "center", alignItems: "center", borderBottomColor: this.state.productDetailFlag === "overview" ? "#16A8B1" : null, borderBottomWidth: this.state.productDetailFlag === "overview" ? 3 : null }}>
                                    <TouchableOpacity onPress={() => { this.setState({ productDetailFlag: "overview" }) }} style={{ backgroundColor: "white" }}>
                                        <Text style={{ fontSize: 13, color: this.state.productDetailFlag === "overview" ? "#16A8B1" : "#A5A5A5", fontWeight:"700" }}>OVERVIEW</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.34, backgroundColor: "transparent", justifyContent: "center", alignItems: "center", borderBottomColor: this.state.productDetailFlag === "Detail" ? "#16A8B1" : null, borderBottomWidth: this.state.productDetailFlag === "Detail" ? 3 : null }}>
                                    <TouchableOpacity onPress={() => { this.setState({ productDetailFlag: "Detail" }) }}>
                                        <Text style={{ fontSize: 13, color: this.state.productDetailFlag === "Detail" ? "#16A8B1" : "#A5A5A5", fontWeight:"700" }}>DETAILS</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.33, backgroundColor: "transparent", justifyContent: "center", alignItems: "center", borderBottomColor: this.state.productDetailFlag === "ReturnPolicy" ? "#16A8B1" : null, borderBottomWidth: this.state.productDetailFlag === "ReturnPolicy" ? 3 : null }}>
                                    <TouchableOpacity onPress={() => { this.setState({ productDetailFlag: "ReturnPolicy" }) }}>
                                        <Text style={{ fontSize: 13, color: this.state.productDetailFlag === "ReturnPolicy" ? "#16A8B1" : "#A5A5A5", fontWeight:"700" }}>RETURN POLICY</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {
                                this.state.productDetailFlag == "overview" ?


                                    <View style={{ paddingHorizontal: 35, backgroundColor: "white", paddingVertical: 25 }}>

                                        <View style={{ paddingVertical: 5 }}>
                                            <Text style={{ fontSize: 15, color: "#393939", fontWeight: "bold" }}>Exparation Date: {params.overview.ExparationDate}</Text>
                                        </View>

                                        <View>
                                            {
                                                params.overview.Details.map((item, index) => {
                                                    console.log("item==>", item)

                                                    return (
                                                        this.ProductOverviewDetail(item, index)
                                                    )

                                                })

                                            }
                                        </View>


                                    </View>
                                    :
                                    this.state.productDetailFlag == "Detail" ?
                                        <View style={{ paddingHorizontal: 35, backgroundColor: "transparent", paddingVertical: 25 }}>

                                            <View style={{ paddingVertical: 5 }}>
                                                <Text style={{ fontSize: 15, color: "#393939", fontWeight: "bold" }}>Exparation Date: {params.overview.ExparationDate}</Text>
                                            </View>

                                            <View>
                                                {
                                                    params.overview.Details.map((item, index) => {
                                                        console.log("item==>", item)

                                                        return (
                                                            this.ProductOverviewDetail(item, index)
                                                        )

                                                    })

                                                }
                                            </View>


                                        </View>

                                        : this.state.productDetailFlag == "ReturnPolicy" ?
                                            <View style={{ paddingHorizontal: 35, backgroundColor: "transparent", paddingVertical: 25 }}>

                                                <View style={{ paddingVertical: 5 }}>
                                                    <Text style={{ fontSize: 15, color: "#393939", fontWeight: "bold" }}>Exparation Date: {params.overview.ExparationDate}</Text>
                                                </View>

                                                <View>
                                                    {
                                                        params.overview.Details.map((item, index) => {
                                                            console.log("item==>", item)

                                                            return (
                                                                this.ProductOverviewDetail(item, index)
                                                            )

                                                        })

                                                    }
                                                </View>


                                            </View>

                                            :
                                            null
                            }


                        </View>

                        <View style={{ backgroundColor: "white", borderWidth: 0.5, borderColor: "#A5A5A5", paddingVertical:"5%" }}>

                            <View style={{ paddingVertical: 10, paddingHorizontal: 17 }}>
                                <Text style={{fontWeight:"700", color: "#2B2B2B"}}>RELATED ITEMS</Text>
                            </View>
                            <ScrollView horizontal={true} style={{backgroundColor:"transparent",paddingHorizontal: 17 }}>
                                {
                                    params.RelatedItems.map((item, index) => {
                                        return (
                                            this.relatedItemList(item, index)
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>

                <View style={{ flex: 0.1, backgroundColor: "white", flexDirection: "row", borderWidth: 0.5, borderColor: "#A5A5A5" }}>

                    <View style={{ flex: 0.5, backgroundColor: "white", justifyContent: "center", alignItems: "flex-start", paddingHorizontal: "5%" }}>
                        <Text style={{ color: "#003A51", fontSize: 16 }}>{params.cost} KWD</Text>

                        <View style={{ backgroundColor: "white", flexDirection: "row", paddingVertical: "2%" }}>

                            <Text style={{ color: "#A5A5A5", textDecorationLine: "line-through", fontSize: 13 }}>1200 KWD    </Text>
                            <Text style={{ color: "#16A8B1", fontSize: 13 }}>30% OFF</Text>

                        </View>

                    </View>

                    <View style={{ flex: 0.5, backgroundColor: "white", justifyContent: "center", alignItems: "center", top: "3%" }}>
                        <_Button
                            text="Add to cart"
                            theme={"primary"}
                            onPress={() => {
                                RNToasty.Success({
                                    title:"Item added to cart",
                                    titleSize:15
                                })
                            }}
                            halfButton={true}
                        />
                    </View>


                </View>



            </SafeAreaView>

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
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
});
