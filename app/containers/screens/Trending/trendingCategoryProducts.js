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
    FlatList, ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from 'react-navigation-drawer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
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
import trendingCategoryDetails from '../../../actions/TrendingActions/trendingCategoryProductAction';

class TrendingCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectedCategory: null
        };
    }

    componentDidMount() {

        const { params } = this.props.navigation.state;
        this.props.trendingCategoryDetails(params.categoryId)
    }

    retryTrendingCategoryProduct() {
        const { params } = this.props.navigation.state;
        this.props.trendingCategoryDetails(params.categoryId)
    }

    categorySelectedData(item, index) {

        this.setState({ isSelectedCategory: index })
        NavService.navigate('root', 'ProductDetailsStack', item);

    }
    renderTrendingCategoriesProductItem(item, index) {
        return (
            <TouchableOpacity key={index} onPress={() => this.categorySelectedData(item, index)} style={{ backgroundColor: "white", paddingVertical: 15, flexDirection: "row" }}>
                <View style={{ flex: 0.35, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ height: 93, width: 93 }} source={{ uri: item.productImage }} />
                </View>
                <View style={{ flex: 0.65, backgroundColor: "white" }}>
                    <Text style={{ paddingVertical: 4, fontSize: 14, color: "#2B2B2B", fontWeight: "700" }}>{item.productTitle}</Text>
                    <Text style={{ paddingVertical: 2, fontSize: 14, color: "#2B2B2B", fontWeight: "700" }}>{item.categoryDescription}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ paddingVertical: 4, color: "#003A51", fontWeight: "700", fontSize: 14 }}>{item.productAmount} KWD   </Text>
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
     
        return (
            <SafeAreaView style={{ flex:1, backgroundColor: "white" }}>
                <ScrollView style={{ backgroundColor: "white", height: deviceHeight, paddingHorizontal: 20, top: "1%" }}>
                    {
                        this.props.trendingCategoryProductReducers && this.props.trendingCategoryProductReducers.trendingCategoryProductLoading ?
                            <View style={{ height:deviceHeight*0.8, alignItems: "center", justifyContent: "center" }}>
                                <ActivityIndicator size={'large'} />
                            </View>
                            :
                            this.props.trendingCategoryProductReducers && this.props.trendingCategoryProductReducers.trendingCategoryProductData && this.props.trendingCategoryProductReducers.trendingCategoryProductData.trendingProducts ?

                            this.props.trendingCategoryProductReducers.trendingCategoryProductData.trendingProducts.map((item, index) => {
                                    return (
                                        this.renderTrendingCategoriesProductItem(item, index)
                                    )

                                })
                                :
                                <View style={{ height:deviceHeight*0.8, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ paddingVertical: '3%' }}>Something went wrong ..</Text>
                                    <Text onPress={() => this.retryTrendingCategoryProduct()} style={{ color: 'skyblue' }}>Retry</Text>
                                </View>
                    }


                </ScrollView>
            </SafeAreaView>



        );
    }
}

function mapStateToProps(state) {
    return {
        trendingCategoryProductReducers: state.trendingCategoryProductReducers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ trendingCategoryDetails }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingCategories)


const styles = StyleSheet.create({
 
});
