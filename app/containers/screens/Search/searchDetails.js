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
import { NavigationActions, StackActions } from 'react-navigation';
import { deviceWidth, deviceHeight } from '../../../constants/globals';
import DummyJSON from "../../../lib/dummyJson";
import appStyles from '../../../constants/appStyle';
import NavService from '../../navigators/navigationService';
import Icon from 'react-native-vector-icons/AntDesign';
import CartIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { greyIcon } from '../../../constants/colors';


export default class SearchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectedCategory: null
        };
    }

    categorySelectedData(item, index) {
        this.setState({ isSelectedCategory: index })
        NavService.navigate('root', 'ProductDetailsStack', item);

    }

    renderSearchCategoriesItem(item, index) {
        console.log("item of discover", item)
        return (
            <TouchableOpacity key={index} onPress={()=>this.categorySelectedData(item,index)} style={{ backgroundColor: "white", paddingVertical: 15, flexDirection: "row" }}>
                <View style={{ flex: 0.35, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ height: 93, width: 93 }} source={{ uri: item.categoryImage }} />
                </View>
                <View style={{ flex: 0.65, backgroundColor: "white" }}>
                    <Text style={{ paddingVertical: 4, fontSize: 14, color: "#2B2B2B", fontWeight: "700" }}>{item.categoryTitle}</Text>
                    <Text style={{ paddingVertical: 2, fontSize: 14, color: "#2B2B2B", fontWeight: "700" }}>{item.categoryDescription}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ paddingVertical: 4, color: "#003A51", fontWeight: "700", fontSize: 14 }}>{item.cost} KWD   </Text>
                        {item.discountcost ? <Text style={{ fontSize: 14, textDecorationLine: "line-through", paddingVertical: 4, fontWeight: "700", color: "#2B2B2B" }}>{item.discountcost}</Text> : null}
                    </View>

                    <View style={{ flexDirection: "row-reverse", paddingHorizontal: 10 }}>
                        {this.state.isSelectedCategory === index ? <Icon name='heart' size={23} color="red" /> : <Icon name='hearto' size={23} color="#A5A5A5" />}
                    </View>
                </View>


            </TouchableOpacity>
        )
    }


    render() {
        const { params } = this.props.navigation.state;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.1, backgroundColor: "white", flexDirection: "row", borderBottomColor: "#A5A5A5", borderBottomWidth: 0.5 }}>

                    <View style={{ backgroundColor: "transaparent", flex: 0.15,justifyContent:"center" }}>
                        <_TouchItem
                            style={{ margin: 10 }}
                            onPress={() => {
                                NavService.goBack('root');
                            }}>
                            <CartIcon
                                style={{ fontSize: 35 }}
                                name={'chevron-left'}
                                color={greyIcon}
                                size={50}
                            />
                        </_TouchItem>
                    </View>
                    <View style={{ backgroundColor: "transaparent", flex: 0.7, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, color: "black", fontWeight: '700' }}>{params}</Text>
                    </View>
                    <View style={{ backgroundColor: "transaparent", flex: 0.15, justifyContent: "center" }}>
                        <_TouchItem
                            style={{ marginRight: 10, flexDirection: 'row' }}
                        >

                            <CartIcon
                                name={'cart-outline'}
                                onPress={() => { NavService.navigate('root', 'Cart') }}
                                color={'black'}
                                size={25}
                                style={{ marginRight: 5, top: "5%" }}
                            />
                        </_TouchItem>
                    </View>


                </View>
                <View style={{ flex: 0.9 }}>
                    <ScrollView contentContainerStyle={{ backgroundColor: "white", height: deviceHeight, paddingHorizontal: 20 }}>

                        {
                            DummyJSON.DiscovercategoriesData.map((item, index) => {
                                return (
                                    this.renderSearchCategoriesItem(item, index)
                                )

                            })
                        }


                    </ScrollView>
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
