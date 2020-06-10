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
    FlatList,TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from 'react-navigation-drawer';
import _Input from '../../../components/Input/_Input';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _Header from '../../../components/Header/_MainHeader';
import { SearchBar } from 'react-native-elements';
import { deviceWidth, deviceHeight } from '../../../constants/globals';
import DummyJSON from "../../../lib/dummyJson";
import appStyles from '../../../constants/appStyle';
import NavService from '../../navigators/navigationService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const searchData = [
    "Baby Clothing",
    "Gents wear",
    "Travel",
    "Nursary",
    "Shirts",
    "Kitchen appliances",
    "Electric items",
    "Kitchen tools",
    "Facewash",
    "Gentle soap",
    "Towel",
    "Heater",
    "Sofa",
    "Bed",
    "Toy",
    "Train"

]
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchArrayData: null
        };
    }



    updateSearch = search => {
        let filter = [];
        console.log("insearch", search)
        this.setState({ search })
        filter = searchData.filter(data => {
            if (data.toLowerCase().startsWith(search.toLowerCase())) {
                return data;
            }
        });
        this.setState({ searchArrayData: filter });

    };

    render() {
        console.log("searchData", this.state.searchArrayData)
        const { search, searchArrayData } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor:"white" }}>
               
                <View style={{ flex: 0.17, backgroundColor: "transparent" }}>
                
                    <SearchBar
                        placeholder="Search..."
                        onChangeText={this.updateSearch}
                        value={search}
                        containerStyle={{ backgroundColor: "white",paddingHorizontal:deviceWidth*0.05,borderWidth:1 }}
                        inputContainerStyle={{ borderWidth: 1, backgroundColor: "#e5e8e7" }}
                    />
                    
                </View>
                <View style={{ flex: 0.83, backgroundColor: "transparent",paddingHorizontal:deviceWidth*0.07 }}>
                 <ScrollView>
                    {
                        searchArrayData&&searchArrayData.map((item, index) => {
                            return (
                                <View key ={index} style={{padding:"1.5%"}}>
                                    <TouchableOpacity>
                                    <Text style={{fontSize:17,color:"#737373",fontWeight:"bold"}}>{item}</Text>
                                    </TouchableOpacity>
                                </View>
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
