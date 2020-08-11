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
import CategoriesDetails from './_CategoryDetails';

class Categories extends Component {
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



  async componentDidMount() {

    await AsyncStorage.getItem('LoggedInData').then(value => {
      if (value) {
        let objectvalue = JSON.parse(value)
        this.setState({ loggedInCredentials: objectvalue })
        console.log("async value", objectvalue)
        this.props.categoryDetails(this.state.loggedInCredentials && this.state.loggedInCredentials.userId)
      }
      else {
        this.props.categoryDetails()
      }
    });

    this.props.bannerCategory()

  }

  retryBanner() {
    this.props.bannerCategory()
  }

  retryCategories(){
    if(this.state.loggedInCredentials){
    this.props.categoryDetails(this.state.loggedInCredentials && this.state.loggedInCredentials.userId)
    }
    else{
      this.props.categoryDetails()
 
    }
  }

  categoriesDescription(index) {
    console.log("indexx of prop", index)
    console.log("categories", this.state.categoriesDescriptionArray[index])
    this.setState({ categoriesindex: index })
  }
  _keyExtractor = (item, index) => item.categoryId;

  _renderCategoriesList = ({ item, index }) => {
    console.log("item", item)
    return (
      <CategoriesDetails categoryList={item} categoryIndex={index}/>
    )
  }
  bannerView(item, index) {
    console.log("item of banner", item)
    return (
      <View style={styles.slide1}>
        <Image style={{
          width: deviceWidth,
          flex: 1,
          backgroundColor: 'transparent',
          resizeMode: 'cover'
        }} source={{ uri: item }} />

      </View>
    )
  }

  reorderProductList(item, index) {
    return (
      <TouchableOpacity onPress={()=>{ NavService.navigate('root', 'ProductDetailsStack', item);}} style={{ backgroundColor: "transparent", width: deviceWidth * 0.3,paddingHorizontal:15 }}>

        <View style={{ paddingVertical: 5, backgroundColor: "transparent" }}>
          <Image style={{ height: 114, width: 107,resizeMode:'contain' }} source={{ uri: item.productImage }} />

        </View>
        <View style={{ paddingVertical: 10, backgroundColor: "transparent"}}>
          <Text style={{ fontSize: 14, color: "#2B2B2B", paddingVertical: 3, fontWeight: "700" }}>{item.productTitle}</Text>
          <Text style={{ fontSize: 14, color: "#003A51", fontWeight: "700" }}>{item.productAmount} KWD</Text>
        </View>
      </TouchableOpacity>

    )

  }

  render() {
    console.log("dummyjson", this.props.categoryReducer)
    return (
      <SafeAreaView style={[appStyles.container]}>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            paddingTop: "2.5%"
          }}
        >
          <View style={{ flex: 0.28, backgroundColor: "transparent" }}>
            {
              this.props.categoryBannerReducer.bannerCategoryLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator />
                </View>
                :
                this.props.categoryBannerReducer.bannerCategoryData && this.props.categoryBannerReducer.bannerCategoryData.data ?
                  <Swiper showsButtons={false} autoplay={true}
                    buttonWrapperStyle={{ top: "10%" }}
                    paginationStyle={{position:'absolute', bottom: 10}}
                    style={styles.wrapper} showsButtons={true}>
                    {
                      this.props.categoryBannerReducer.bannerCategoryData && this.props.categoryBannerReducer.bannerCategoryData.data.map((item, index) => {
                        return (
                          this.bannerView(item, index)
                        )
                      })
                    }
                  </Swiper>
                  :
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ paddingVertical: '3%' }}>Something went wrong ..</Text>
                    <Text onPress={() => this.retryBanner()} style={{ color: 'skyblue' }}>Retry</Text>
                  </View>
            }
          </View>

          <View style={{ flex: 0.72, backgroundColor: "transparent" }}>
            {
              this.props.categoryReducer && this.props.categoryReducer.isFetching ?
                <View style={{ flex: 0.75, alignItems: "center", justifyContent: "center" }}>
                  <ActivityIndicator size={'large'} />
                </View>
                :
                this.props.categoryReducer && this.props.categoryReducer.categoriesData && this.props.categoryReducer.categoriesData.data?
                <ScrollView contentContainerStyle={{paddingBottom:"10%"}}>
                  <FlatList
                    data={this.props.categoryReducer && this.props.categoryReducer.categoriesData && this.props.categoryReducer.categoriesData.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderCategoriesList}
                  />

                  {
                    this.props.categoryReducer && this.props.categoryReducer.categoriesData && this.props.categoryReducer.categoriesData.reorderProducts ?

                      <View style={{ backgroundColor: "transparent", paddingVertical: "5%",marginTop:4 }}>

                        <View style={{ paddingVertical: 10, paddingHorizontal: 17 }}>
                          <Text style={{ fontWeight: "700", color: "#2B2B2B" }}>REORDER AGAIN</Text>
                        </View>
                        <ScrollView horizontal={true} style={{ backgroundColor: "transparent"}}>
                          {
                             this.props.categoryReducer.categoriesData.reorderProducts.map((item, index) => {
                              return (
                                this.reorderProductList(item, index)
                              )
                            })
                          }
                        </ScrollView>
                      </View>
                      :
                      null
                  }
                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ paddingVertical: '3%' }}>Something went wrong ..</Text>
                <Text onPress={() => this.retryCategories()} style={{ color: 'skyblue' }}>Retry</Text>
              </View>
            }
          </View>

        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    categoryReducer: state.categoryReducer,
    categoryBannerReducer: state.categoryBannerReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ categoryDetails, bannerCategory }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)

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

