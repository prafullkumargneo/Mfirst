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

export default class DiscoverCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectedCategory: null
        };
    }
    categorySelectedData(item, index) {
        this.setState({isSelectedCategory:index})
        NavService.navigate('root', 'ProductDetailsStack',item);

    }
    renderDiscoverCategoriesItem(item, index) {
        console.log("item of discover",item)
        return (
            <TouchableOpacity onPress={() => this.categorySelectedData(item, index)} style={{ backgroundColor: "white", paddingVertical: 15, flexDirection: "row" }}>
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
                        {this.state.isSelectedCategory===index?<Icon name='heart' size={23} color="red" />:<Icon name='hearto' size={23} color="#A5A5A5" />}
                    </View>
                </View>


            </TouchableOpacity>
        )
    }




    render() {

        return (
            <SafeAreaView style={{ backgroundColor: "white" }}>
                <ScrollView contentContainerStyle={{ backgroundColor: "white", height: deviceHeight, paddingHorizontal: 20,top:"3%" }}>

                    {
                        DummyJSON.DiscovercategoriesData.map((item, index) => {
                            return (
                                this.renderDiscoverCategoriesItem(item, index)
                            )

                        })
                    }


                </ScrollView>
                <View  style={{position:'absolute',top:deviceHeight*0.77,backgroundColor:"#3FC1C9",height:36,width:141,borderRadius:40,justifyContent:"center",alignItems:"center",left:deviceHeight*0.16}}>
                    <Text onPress={()=> {NavService.goBack('home')}} style={{fontSize:15,fontWeight:"700",color:"white"}}>Modify Search</Text>
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
});
