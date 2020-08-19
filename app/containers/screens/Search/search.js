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
    FlatList, TouchableOpacity, ActivityIndicator,Image
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
import Modal from 'react-native-modal'

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
            searchArrayData: null,
            isloadingFilter: false,
            initialSearchData:false
        };
    }

componentDidMount(){
    this.setState({initialSearchData:true})
}

    updateSearch = search => {
        let filter = [];
        console.log("insearch", search)
        this.setState({ search,initialSearchData:false })
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
        if (this.state.isloadingFilter) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator animating={true} color={"#003a51"} size={"large"} />
                </View>
            )
        }
        else {

            return (
             
                <View style={{ flex: 1, backgroundColor: "white" }}>
   

                    <View style={{ flex: 0.17, backgroundColor: "transparent" }}>
                        {/* <SearchBar placeholder="Search contacts..."
                            data={this.state.searchResultFriendsList}
                            ref={(ref) => this.searchBar = ref}
                            style={styles.searchbar}
                            lightTheme round
                            containerStyle={styles.searchcontainer}
                        /> */}
                        
                            <SearchBar
                                placeholder="Search..."
                                onChangeText={this.updateSearch}
                                value={search}
                                containerStyle={styles.searchcontainer}
                               
                                round
                                //  containerStyle={{ backgroundColor: "white", paddingHorizontal: deviceWidth * 0.05 }}
                                style={styles.searchbar}
                                inputContainerStyle={{ borderWidth: 1, backgroundColor: "white",borderBottomWidth:1 }}
                            />

                    </View>
                    <View style={{ flex: 0.83, backgroundColor: "transparent", paddingHorizontal: deviceWidth * 0.07 }}>
               { 
                     this.state.initialSearchData ?
                     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                           
                           <Image source={require("../../../assets/images/searchicon.gif")}  />
                             
                                <View style={{paddingVertical:'10%'}}>
                     <Text style={{ fontSize: 13, color: "#737373",textAlign:"center" }}>You havent searched for items yet. Let's start now - we'll help you</Text>
                     </View>
                 </View>
                     :

                        <ScrollView>
                            {
                                searchArrayData && searchArrayData.map((item, index) => {
                                    return (
                                        <View key={index} style={{ padding: "1.5%" }}>
                                            <TouchableOpacity key={index} onPress={() => {
                                                this.setState({ isloadingFilter: true })
                                                setTimeout(() => {
                                                    NavService.navigate('root', 'SearchDetails', item);
                                                    this.setState({ isloadingFilter: false })
                                                }, 300

                                                )
                                            }}>

                                                <Text style={{ fontSize: 17, color: "#737373", fontWeight: "bold" }}>{item}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>

                    }

                    </View>
                 
                </View>
             

            );
        }
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: 'yellow',

        justifyContent: 'space-around',
    },
    searchcontainer: {
        backgroundColor: 'white',
        borderWidth: 0, //no effect
        shadowColor: 'white', //no effect
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        paddingHorizontal: deviceWidth * 0.05
       }
});
