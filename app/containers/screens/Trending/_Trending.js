import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Alert,
  AsyncStorage,
  StatusBar, ActivityIndicator, FlatList, TouchableOpacity, ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
import { deviceWidth, deviceHeight } from '../../../constants/globals';
import _Input from '../../../components/Input/_Input';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _Header from '../../../components/Header/_MainHeader';
import trendingProductsAction from '../../../actions/TrendingActions/trendingProductsAction';
import appStyles from '../../../constants/appStyle';
import NavService from '../../navigators/navigationService';

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingIndex:null
    };
  }

  componentDidMount() {
    this.props.trendingProductsAction()
  }

  trendingDescription(index) {
    this.setState({ trendingIndex: index })
  }

  _keyExtractor = (item, index) => item.categoryId;


  _renderTrendingProductList = ({ item, index }) => {
  
    return (
      <View style={{  backgroundColor: "transparent", flexDirection:'row' }}>
        
        <TouchableOpacity onPress={() => {  NavService.navigate('home', 'TrendingCategories', item); }} style={{ backgroundColor: "white", paddingVertical: 3, width:deviceWidth*0.25 }}>
          <View style={{ paddingVertical: 3, paddingHorizontal: 13 }}>
            <View style={{ flex: 0.25,alignItems:'center' }}>
              <Image style={{
                height: 70, width: 70, borderBottomLeftRadius: 70,  borderColor: '#848484', borderWidth:0.2,
                borderBottomRightRadius: 70,
                borderTopRightRadius: 70,
                borderTopLeftRadius: 70,
                overflow: 'hidden',
              }} source={{ uri: item.categoryImage }} />

            </View>
            <View style={{ flex: 0.65, justifyContent: "center" }}>

              <Text style={{ color: "#393939", fontSize: 15, fontWeight: "700",textAlign:'center' }}>
              {item.categoryTitle}
              </Text>
            </View>
            <View style={{ flex: 0.1, alignItems: "flex-end", margin: 3, justifyContent: "center" }}>
              {/* {this.state.categoriesindex === index ? <Icon size={18} color="#3FC1C9" name="ios-arrow-up" /> : <Icon size={18} color="#3FC1C9" name="ios-arrow-down" />} */}
            </View>

          </View>
        </TouchableOpacity>
      
      </View>
    )
  }

  retryTrendingProduct() {
    this.props.trendingProductsAction()
  }

  render() {
    console.log("trending reducer data", this.props.trendingProductReducers)
    return (
      <SafeAreaView style={[appStyles.container]}>
        <View
          style={{
            flex: 1,
            backgroundColor: "white"
          }}
        >
          <View style={{ flex: 0.03, backgroundColor: "transparent" }}>

          </View>

          <View style={{ flex: 0.97, backgroundColor: "transparent" }}>
            {
              this.props.trendingProductReducers && this.props.trendingProductReducers.trendingProductLoading ?
                <View style={{ flex: 0.75, alignItems: "center", justifyContent: "center" }}>
               <Image  source={require("../../../assets/images/gifloader.gif")}  />
                </View>
                :
                this.props.trendingProductReducers && this.props.trendingProductReducers.trendingProductData ?
                <ScrollView>
                <FlatList
                  data={this.props.trendingProductReducers && this.props.trendingProductReducers.trendingProductData}
                  extraData={this.state}
                  contentContainerStyle={{
                    flexWrap: 'wrap'
                    }}
                    numColumns={4}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderTrendingProductList}
                />
                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ paddingVertical: '3%' }}>Something went wrong ..</Text>
                <Text onPress={() => this.retryTrendingProduct()} style={{ color: 'skyblue' }}>Retry</Text>
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
    trendingProductReducers: state.trendingProductReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ trendingProductsAction }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trending)


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
});
