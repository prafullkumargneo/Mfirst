import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Keyboard,
    Alert,
    StatusBar,
    FlatList, TouchableOpacity, ScrollView, ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import _Input from '../../../components/Input/_Input';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _Header from '../../../components/Header/_MainHeader';
import Swiper from 'react-native-swiper';
import { deviceWidth, deviceHeight } from '../../../constants/globals';
import appStyles from '../../../constants/appStyle';
import DummyJSON from "../../../lib/dummyJson";
import * as image_url from '../../../assets/images/map';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import categoryDetails from '../../../actions/CategoriesActions/CategoryActions';
import bannerCategory from '../../../actions/CategoriesActions/categoryBannerAction';
import Image from 'react-native-image-progress';
import NavService from '../../navigators/navigationService';

class CategoriesDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInCredentials: null,
            categoriesFlag: false,
            categoriesDescriptionArray: DummyJSON.categoriesData,
            categoriesindex: [],
            password: '',
        };

    }


    categoriesDescription(index) {
        console.log("indexx of prop", index)
        console.log("categories", this.state.categoriesDescriptionArray[index])
        this.setState({ categoriesindex: index, categoriesFlag: !this.state.categoriesFlag })
    }


    render() {
        console.log("dummyjson", this.props.categoryReducer)
        return (
            <View style={{ backgroundColor: "#EEEEEE" }}>

                <TouchableOpacity onPress={() => { this.categoriesDescription(this.props.categoryIndex) }} style={{ backgroundColor: "white", paddingVertical: 3, margin: 2 }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 3, paddingHorizontal: 13 }}>
                        <View style={{ flex: 0.25 }}>
                            <Image style={{
                                height: 56, width: 57, borderBottomLeftRadius: 70, borderColor: '#848484', borderWidth: 0.2,
                                borderBottomRightRadius: 70,
                                borderTopRightRadius: 70,
                                borderTopLeftRadius: 70,
                                overflow: 'hidden',
                            }} source={{ uri: this.props.categoryList.categoryImage }} />

                        </View>
                        <View style={{ flex: 0.65, justifyContent: "center" }}>

                            <Text style={{ color: "#393939", fontSize: 15, fontWeight: "700" }}>{this.props.categoryList.categoryTitle}</Text>
                        </View>
                        <View style={{ flex: 0.1, alignItems: "flex-end", margin: 3, justifyContent: "center" }}>
                            {!this.state.categoriesFlag ? <Icon size={18} color="#3FC1C9" name="ios-arrow-up" /> : <Icon size={18} color="#3FC1C9" name="ios-arrow-down" />}
                        </View>

                    </View>
                </TouchableOpacity>
                <ScrollView horizontal={true} style={{ flexDirection: "row", backgroundColor: "white", width: deviceWidth }}>
                    {this.state.categoriesFlag ?

                        this.props.categoryList.subCategory ?
                            this.props.categoryList.subCategory && this.props.categoryList.subCategory.map((item) => {
                                return (
                                    <TouchableOpacity onPress={() => { NavService.navigate('root', 'SearchDetails', item); }} style={{ height: deviceHeight * 0.2, justifyContent: "center", paddingHorizontal: 15 }}>
                                        <View style={{ paddingVertical: 10 }}>
                                            <Image style={{
                                                height: 66, width: 66, borderBottomLeftRadius: 70, borderColor: '#848484', borderWidth: 0.2,
                                                borderBottomRightRadius: 70,
                                                borderTopRightRadius: 70,
                                                borderTopLeftRadius: 70,
                                                overflow: 'hidden'
                                            }} source={{ uri: item.categoryImage }} />
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            {item.categoryTitle.split(' ').map((item, i) => <Text style={{ justifyContent: "space-between", color: "#2B2B2B", fontSize: 12, fontWeight: '700' }}>{item}</Text>)}
                                        </View>

                                    </TouchableOpacity>
                                )
                            })
                            :
                            <View style={{ height: deviceHeight * 0.05, backgroundColor: "transparent", justifyContent: "center", width: deviceWidth, alignItems: "center" }}>
                                <Text style={{ fontWeight: "700" }}>Product coming soon...</Text>
                            </View>
                        :
                        null
                    }
                </ScrollView>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesDetails)

const styles = StyleSheet.create({
    headerContainer: {
        height: Platform.select({
            android: '10%',
            default: '8%',
        }),
        paddingTop: 0,
        backgroundColor: 'white',

        justifyContent: 'space-around',
    },
    wrapper: {
        height: 150
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'


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
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});

