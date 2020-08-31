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
import FilterIcon from 'react-native-vector-icons/MaterialIcons';
import CartIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { greyIcon } from '../../../constants/colors';
import ToggleIcon from 'react-native-vector-icons/FontAwesome';
import subcategoryDetails from '../../../actions/CategoriesActions/subCategoryAction';
import getFilterOption from '../../../actions/SearchActions/getFilterOptionsActions';
import Modal from 'react-native-modal'
import Slider from 'react-native-slider';

class SearchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectedCategory: null,
            isSameDayDeleveryFlag: false,
            subCategorySelectData: null,
            subCategoryProductFlag: false,
            isFilterVisible: false

        };
    }

    componentDidMount() {
        this.setState({ subCategorySelectData: null })
        console.log("this.props.navigation.state", this.props.navigation.state)
        const { params } = this.props.navigation.state;
        console.log("params in componentDid", params)
        this.props.subcategoryDetails(params.categoryId)
        this.props.getFilterOption({ categoryId: params.categoryId })

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

    }

    initialProductListingData(item, index) {
        console.log("item in initail product listing data", item)
        if (index == 1 && this.state.subCategorySelectData == null) {
            this.setState({ subCategorySelectData: item })
        }
    }

    renderSearchSubCategoriesItem(item, index) {
        this.initialProductListingData(item, index)
        return (
            <TouchableOpacity onPress={() => this.subcategoryData(item, index)} key={item.categoryId} style={{}}>
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
        let filterData = this.props.getFilterOptionReducer && this.props.getFilterOptionReducer.getFilterOptionData
        console.log(" subcategory selected data", this.state.subCategorySelectData)


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
                                    <Image source={require("../../../assets/images/gifloader.gif")} />
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
                <View style={{ flex: 0.04, backgroundColor: "#FFE59C", flexDirection: "row", paddingLeft: "4%" }}>
                    <View style={{ justifyContent: "center" }}>
                        {this.state.isSameDayDeleveryFlag ? <ToggleIcon onPress={() => this.sameDayDelivery()} name={'toggle-on'} size={25} color={'#8AD5CA'} /> : <ToggleIcon onPress={() => this.sameDayDelivery()} name={'toggle-off'} size={25} color={'#8AD5CA'} />}
                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <Text style={{ paddingLeft: "3%", fontSize: 13, color: "#6E6E6E" }}>Same day delivery</Text>
                    </View>
                </View>

                <View style={{ flex: 0.04, flexDirection: "row", paddingHorizontal: deviceWidth * 0.05, paddingVertical: deviceHeight * 0.01 }}>

                    <View style={{ flex: 0.3, backgroundColor: 'purple' }}>
                    </View>
                    <View style={{ flex: 0.45, backgroundColor: 'yellow' }}>
                    </View>
                    <TouchableOpacity onPress={() => { this.setState({ isFilterVisible: true }) }} style={{ flex: 0.25, backgroundColor: 'pink', borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 13, color: "#737373" }}>Filters</Text>
                        <FilterIcon name='filter-list' size={23} color="#737373" />
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 0.65 }}>
                    <ScrollView style={{ backgroundColor: "white", height: deviceHeight, paddingHorizontal: 20 }}>

                        {
                            this.state.subCategoryProductFlag || this.props.subcategoryReducer.issubcategoryLoading ?
                                <View style={{ paddingTop: deviceHeight * 0.3, width: deviceWidth, justifyContent: "center", alignItems: "center" }}>
                                    <Image source={require("../../../assets/images/gifloader.gif")} />
                                </View>

                                :
                                this.state.subCategorySelectData && this.state.subCategorySelectData.productsData ?
                                    this.state.subCategorySelectData && this.state.subCategorySelectData.productsData.length > 0 ?
                                        this.state.subCategorySelectData.productsData.map((item, index) => {
                                            return (
                                                this.renderSearchCategoriesItem(item, index)
                                            )

                                        })
                                        :
                                        <View style={{ paddingTop: deviceHeight * 0.3, width: deviceWidth, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: 16 }}>Products coming soon....</Text>
                                        </View>
                                    :

                                    null
                        }


                    </ScrollView>
                </View>
                {/* {
            this.state.isFilterVisible ?
              <View style={{ height: deviceHeight * 0.26, width: deviceWidth, position: "absolute", top: deviceHeight*0.7, backgroundColor: "white", paddingHorizontal: 20 }}>
                <View style={{ backgroundColor: "white", paddingVertical: 13 }}>
                  <View style={{ justifyContent: "center", paddingVertical: 4 }}>
                    <Text style={{ color: "#848484", fontSize: 14, fontWeight: '700' }}>PRICE</Text>
                  </View>
                  <View style={{paddingHorizontal:'10%'}}>
                  <Slider
                    value={this.state.priceValue}
                    onValueChange={(priceValue) => this.setState({ priceValue })}
                    // trackStyle={{ color: "#003A51" }}
                    minimumValue={30}
                    maximumValue={500}
                    step={20}
                    thumbTintColor={"#003A51"}
                             />
                             </View>
                  <Text style={{ color: "#848484", fontSize: 14 }}>{this.state.priceValue} KWD</Text>
                </View>

                <View style={{ backgroundColor: "white" }}>

                  <View style={{ justifyContent: "center", paddingVertical: 4 }}>
                    <Text style={{ color: "#848484", fontSize: 14, fontWeight: '700' }}>COLORS</Text>
                  </View>
                  <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: "row" }}>
                    {
                      DummyJSON.DiscoverData.colors.map((item, index) => {
                        return (
                          <View style={{ backgroundColor: "white", margin: 3, width: deviceWidth * 0.1, height: deviceHeight * 0.05, borderRadius: 50, borderWidth: this.state.colorFilterData === index ? 2 : 1, justifyContent: "center", alignItems: "center", borderColor: this.state.colorFilterData === index ? 'black' : "#848484" }}>
                            <TouchableOpacity onPress={() => { this.filterColorData(item, index) }} style={{ backgroundColor: item, width: deviceWidth * 0.08, height: deviceHeight * 0.04, borderRadius: 50 }} />
                          </View>
                        )
                      })
                    }
                  </ScrollView>
                </View>
              </View>
              : null
          } */}
                <Modal
                    backdropColor="#B4B3DB"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                    isVisible={this.state.isFilterVisible}
                    style={styles.filterModal}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ backgroundColor: "pink", paddingHorizontal: deviceWidth * 0.03, alignItems: "flex-end", justifyContent: "center" }}>
                            <Icon onPress={() => this.setState({ isFilterVisible: false })} name={'close'} size={28} />
                        </View>
                        <View style={{ backgroundColor: "yellow", paddingVertical: 13 }}>

                            <View style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#848484", fontSize: 14, fontWeight: '700' }}>PRICE</Text>
                            </View>
                            <View>
                                <View style={{ paddingHorizontal: deviceWidth * 0.06 }}>
                                    <Slider
                                        value={this.state.priceValue}
                                        onValueChange={(priceValue) => this.setState({ priceValue })}
                                        // trackStyle={{ color: "#003A51" }}
                                        minimumValue={filterData && filterData.PriceRange.minPrice}
                                        maximumValue={filterData && filterData.PriceRange.maxPrice}
                                        step={20}
                                        thumbTintColor={"#003A51"}
                                    />
                                </View>
                                <Text style={{ color: "#848484", fontSize: 14 }}>{this.state.priceValue} KWD</Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: "pink" }}>

                            <View style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#848484", fontSize: 14, fontWeight: '700' }}>COLORS</Text>
                            </View>
                            <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: "row" }}>
                                {
                                    filterData && filterData.ValueDetails.map((item, index) => {
                                        return (
                                            <View style={{ backgroundColor: "white", margin: 3, width: deviceWidth * 0.1, height: deviceHeight * 0.05, borderRadius: 50, borderWidth: this.state.colorFilterData === index ? 2 : 1, justifyContent: "center", alignItems: "center", borderColor: this.state.colorFilterData === index ? 'black' : "#848484" }}>
                                                <TouchableOpacity onPress={() => { this.filterColorData(item, index) }} style={{ backgroundColor: "purple", width: deviceWidth * 0.08, height: deviceHeight * 0.04, borderRadius: 50 }} />
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>

                    </View>

                </Modal>

            </View>


        );

    }
}

function mapStateToProps(state) {
    return {
        subcategoryReducer: state.subcategoryReducer,
        getFilterOptionReducer: state.getFilterOptionReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ subcategoryDetails, getFilterOption }, dispatch)
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
    filterModal: {

        backgroundColor: "yellow",
        top: deviceHeight * 0.7
    }
});
