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
    FlatList, TouchableOpacity, Image, ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import ToggleIcon from 'react-native-vector-icons/FontAwesome';
import subcategoryDetails from '../../../actions/CategoriesActions/subCategoryAction';


class SearchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectedCategory: null,
            isSameDayDeleveryFlag: false,
            subCategorySelectData: null,
            subCategoryProductFlag: false
        };
    }

    componentDidMount() {

        console.log("this.props.navigation.state", this.props.navigation.state)
        const { params } = this.props.navigation.state;
        console.log("params in componentDid", params)
        this.props.subcategoryDetails(params.categoryId)
    }



    categorySelectedData(item, index) {
        console.log("item of category", item, index)
        NavService.navigate('root', 'ProductDetailsStack', item);
        this.setState({ isSelectedCategory: index })

    }
    subcategoryData(item, index) {
        this.setState({ subCategorySelectData: item, subCategoryProductFlag: true })
        setTimeout(() => {
            this.setState({ subCategoryProductFlag: false })
        }, 1000);
        console.log("item,index", item, index)
    }

    initialProductListingData(index, item) {
        if (index == 1 && this.state.subCategorySelectData === null) {
            this.setState({ subCategorySelectData: item })
        }
    }

    renderSearchSubCategoriesItem(item, index) {
        this.initialProductListingData(index, item)
        return (
            <TouchableOpacity onPress={() => this.subcategoryData(item, index)} key={index} style={{}}>
                <View style={{ paddingVertical: "8%", backgroundColor: "transaparent" }}>
                    <Image resizeMethod='resize' style={{ height: 68, width: 68, borderRadius: 33, opacity: this.state.subCategorySelectData && this.state.subCategorySelectData.categoryId === item.categoryId ? 0.5 : null, backgroundColor: this.state.subCategorySelectData && this.state.subCategorySelectData.categoryId === item.categoryId ? "#379688" : null }} source={{ uri: item.categoryImage }} />
                </View>
                <View style={{ backgroundColor: "transaparent" }}>
                    {item.categoryTitle.split(' ').map((item, i) => <Text style={{ fontSize: 12, textAlign: "center", color: this.state.subCategorySelectData && this.state.subCategorySelectData.categoryId === item.categoryId ? '#379688' : "#2B2B2B", fontWeight: "700" }}>{item}</Text>)}
                </View>
            </TouchableOpacity>
        )
    }

    renderSearchCategoriesItem(item, index) {
        console.log("item of discover")
        return (
            <TouchableOpacity key={index} onPress={() => this.categorySelectedData(item, index)} style={{ backgroundColor: "transparent", paddingVertical: 15, flexDirection: "row" }}>
                <View style={{ flex: 0.3, backgroundColor: "transparent", paddingHorizontal: "1%", paddingVertical: "1%" }}>
                    <Image resizeMethod='resize' style={{ height: 93, width: 93 }} source={{ uri: item.productImage }} />
                </View>
                <View style={{ flex: 0.7, backgroundColor: "transparent" }}>
                    <Text style={{ paddingVertical: "5%", fontSize: 14, color: "#2B2B2B", fontWeight: "700" }}>{item.productTitle}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ paddingVertical: 4, color: "#003A51", fontWeight: "700", fontSize: 14 }}>{item.productAmount} KWD   </Text>
                        {item.productDiscountPercent ? <Text style={{ fontSize: 14, textDecorationLine: "line-through", paddingVertical: 4, fontWeight: "700", color: "#2B2B2B" }}>30% OFF</Text> : null}
                    </View>

                    <View style={{ flexDirection: "row-reverse", paddingHorizontal: 10, backgroundColor: "transparent" }}>
                        {this.state.isSelectedCategory === index ? <Icon name='heart' size={23} color="red" /> : <Icon name='hearto' size={23} color="#A5A5A5" />}
                    </View>
                </View>


            </TouchableOpacity>
        )
    }

    sameDayDelivery() {
        this.setState({ isSameDayDeleveryFlag: !this.state.isSameDayDeleveryFlag })
    }

    retryCategories() {
        this.props.subcategoryDetails(this.props.navigation.state.params.categoryId)
    }

    render() {
        const { params } = this.props.navigation.state;
        console.log("params of subcategory", this.state.subCategorySelectData)

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.09, backgroundColor: "white", flexDirection: "row", borderBottomColor: "#A5A5A5", borderBottomWidth: 0.5 }}>

                    <View style={{ backgroundColor: "transaparent", flex: 0.15, justifyContent: "center" }}>
                        <_TouchItem
                            style={{ margin: 10 }}
                            onPress={() => {
                                NavService.goBack('root');
                            }}>
                            <CartIcon
                                style={{ fontSize: 35 }}
                                name={'chevron-left'}
                                color={greyIcon}
                                size={35}
                            />
                        </_TouchItem>
                    </View>
                    <View style={{ backgroundColor: "transaparent", flex: 0.7, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 16, color: "black", fontWeight: '700' }}>{params.categoryTitle}</Text>
                    </View>
                    <View style={{ backgroundColor: "transaparent", flex: 0.15, justifyContent: "center" }}>
                        <_TouchItem
                            style={{ marginRight: 10, flexDirection: 'row' }}
                        >

                            <CartIcon
                                name={'cart-outline'}
                                onPress={() => { NavService.navigate('root', 'Cart') }}
                                color={'black'}
                                size={23}
                                style={{ paddingLeft: 10, top: "1%" }}
                            />
                        </_TouchItem>
                    </View>


                </View>


                <View style={{ flex: 0.18, backgroundColor: "white" }}>

                    <ScrollView horizontal={true} style={{ backgroundColor: "transparent", height: deviceHeight }}>

                        {
                            this.props.subcategoryReducer.issubcategoryLoading ?
                                <View style={{ width: deviceWidth, justifyContent: "center", alignItems: "center" }}>
                                    <ActivityIndicator size={"large"} />
                                </View>
                                :
                                this.props.subcategoryReducer.subcategoriesData ?
                                    this.props.subcategoryReducer.subcategoriesData[0] && this.props.subcategoryReducer.subcategoriesData[0].subCategory.map((item, index) => {
                                        return (
                                            <View style={{ backgroundColor: "transparent", paddingHorizontal: 10 }}>
                                                {this.renderSearchSubCategoriesItem(item, index)}
                                            </View>
                                        )

                                    })
                                    :
                                    <View style={{ width: deviceWidth, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ paddingVertical: '3%' }}>Something went wrong ..</Text>
                                        <Text onPress={() => this.retryCategories()} style={{ color: 'skyblue' }}>Retry</Text>
                                    </View>
                        }


                    </ScrollView>

                </View>
                <View style={{ flex: 0.05, backgroundColor: "#FFE59C", flexDirection: "row", paddingLeft: "4%" }}>
                    <View style={{ justifyContent: "center" }}>
                        {this.state.isSameDayDeleveryFlag ? <ToggleIcon onPress={() => this.sameDayDelivery()} name={'toggle-on'} size={25} color={'#8AD5CA'} /> : <ToggleIcon onPress={() => this.sameDayDelivery()} name={'toggle-off'} size={25} color={'#8AD5CA'} />}
                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <Text style={{ paddingLeft: "3%", fontSize: 13, color: "#6E6E6E" }}>Same day delivery</Text>
                    </View>
                </View>

                <View style={{ flex: 0.68 }}>
                    <ScrollView style={{ backgroundColor: "white", height: deviceHeight, paddingHorizontal: 20 }}>

                        {
                            this.state.subCategoryProductFlag || this.props.subcategoryReducer.issubcategoryLoading ?
                                <View style={{ paddingTop: "4%", width: deviceWidth, justifyContent: "center", alignItems: "center" }}>
                                    <ActivityIndicator size={"large"} />
                                </View>

                                :
                                this.state.subCategorySelectData && this.state.subCategorySelectData.productsData.length>0? 
                                this.state.subCategorySelectData && this.state.subCategorySelectData.productsData.map((item, index) => {
                                    return (
                                        this.renderSearchCategoriesItem(item, index)
                                    )

                                })
                                :
                                <View style={{ paddingTop: deviceHeight*0.3, width: deviceWidth, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{fontSize:16}}>Products coming soon....</Text>
                            </View>

                        }


                    </ScrollView>
                </View>
            </View>


        );
    }
}

function mapStateToProps(state) {
    return {
        subcategoryReducer: state.subcategoryReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ subcategoryDetails }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDetails)

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: 'yellow',

        justifyContent: 'space-around',
    },
});
