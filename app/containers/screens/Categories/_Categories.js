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
      <View style={{ backgroundColor: "#EEEEEE" }}>

        <TouchableOpacity onPress={() => { this.categoriesDescription(index) }} style={{ backgroundColor: "white", paddingVertical: 3, margin: 2 }}>
          <View style={{ flexDirection: 'row', paddingVertical: 3, paddingHorizontal: 13 }}>
            <View style={{ flex: 0.25 }}>
              <Image style={{
                height: 56, width: 57, borderBottomLeftRadius: 70, borderColor: '#848484', borderWidth: 0.2,
                borderBottomRightRadius: 70,
                borderTopRightRadius: 70,
                borderTopLeftRadius: 70,
                overflow: 'hidden',
              }} source={{ uri: item.categoryImage }} />

            </View>
            <View style={{ flex: 0.65, justifyContent: "center" }}>

              <Text style={{ color: "#393939", fontSize: 15, fontWeight: "700" }}>{item.categoryTitle}</Text>
            </View>
            <View style={{ flex: 0.1, alignItems: "flex-end", margin: 3, justifyContent: "center" }}>
              {this.state.categoriesindex === index ? <Icon size={18} color="#3FC1C9" name="ios-arrow-up" /> : <Icon size={18} color="#3FC1C9" name="ios-arrow-down" />}
            </View>

          </View>
        </TouchableOpacity>
        <ScrollView horizontal={true} style={{ flexDirection: "row", backgroundColor: "white", width: deviceWidth }}>
          {this.state.categoriesindex === index ?

            item.subCategory ?
              item.subCategory && item.subCategory.map((item) => {
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
          <View style={{ flex: 0.25, backgroundColor: "transparent" }}>
            {
              this.props.categoryBannerReducer.bannerCategoryLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator />
                </View>
                :
                this.props.categoryBannerReducer.bannerCategoryData && this.props.categoryBannerReducer.bannerCategoryData.data ?
                  <Swiper showsButtons={false} autoplay={true}
                    buttonWrapperStyle={{ top: "10%" }}
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

          <View style={{ flex: 0.75, backgroundColor: "transparent" }}>
            {
              this.props.categoryReducer && this.props.categoryReducer.isFetching ?
                <View style={{ flex: 0.75, alignItems: "center", justifyContent: "center" }}>
                  <ActivityIndicator size={'large'} />
                </View>
                :
                this.props.categoryReducer && this.props.categoryReducer.categoriesData && this.props.categoryReducer.categoriesData.data?
                <ScrollView>
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

