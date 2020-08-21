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
  FlatList, ActivityIndicator,Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from 'react-navigation-drawer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import TitleDiscover from "./_Title";
import GenderDiscover from "./_Gender";
import FeedingDiscover from "./_Feeding";
import Modal from 'react-native-modal';
import Slider from 'react-native-slider';
import { RNToasty } from 'react-native-toasty';
import discoverCategory from '../../../actions/DiscoverActions/discoverCategoryActions';

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSelectFilter: "FindProducts",
      filterData: [],
      priceValue: 50,
      colorFilterData: null,
      isloadingFilter: false
    };
  }

  componentDidMount() {
    this.props.discoverCategory()
  }

  retryDiscoverProduct() {
    this.props.discoverCategory()

  }

  _keyExtractor = (item, index) => item.valueId;

  _renderDiscoverTitleList = ({ item, index }) => {
    console.log("item of discover", item, this.state.isTitlecheckedindex)
    return (
      <TitleDiscover Content={item} ContentIndex={index} callbackTitleList={(item) => this.TitlefilterList(item)} />
    )
  }
  renderTitle(item, index) {
    console.log("data of discover", item, index)
    return (
      <View style={{ backgroundColor: "white", paddingHorizontal: 25, justifyContent: "center", paddingVertical: 15 }} >
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ color: "#848484", fontSize: 15, fontWeight: '700' }}>{item.attributeName}</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={item.valueDetails}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderDiscoverTitleList}
          numColumns={3}
        />
      </View>
    );
  }

  _renderDiscoverGenderList = ({ item, index }) => {
    console.log("item of discover", item, this.state.isTitlecheckedindex)
    return (
      <GenderDiscover Content={item} ContentIndex={index} callbackTitleList={(item) => this.GenderFilterList(item)} />
    )
  }


  renderGender(DummyJSON) {

    return (
      <View style={{ backgroundColor: "white", paddingHorizontal: 25, justifyContent: "center", paddingVertical: 15 }} >
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ color: "#848484", fontSize: 15, fontWeight: '700' }}>{DummyJSON.headername}</Text>
        </View>
        <FlatList
          horizontal
          data={DummyJSON.GenderDescription}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderDiscoverGenderList}
        />
      </View>
    );
  }


  _renderDiscoverFeedingList = ({ item, index }) => {
    console.log("item of discover", item, this.state.isTitlecheckedindex)
    return (
      <FeedingDiscover Content={item} ContentIndex={index} callbackTitleList={this.FeedingFilterList} />
    )
  }

  renderFeeding(DummyJSON) {

    return (
      <View style={{ backgroundColor: "white", paddingHorizontal: 25, justifyContent: "center", paddingVertical: 15 }} >
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ color: "#848484", fontSize: 15, fontWeight: '700' }}>{DummyJSON.headername}</Text>
        </View>
        <FlatList
          horizontal
          data={DummyJSON.feedingDescription}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderDiscoverFeedingList}
        />
      </View>
    );
  }

  TitlefilterList(item) {
    let FilterData = [item]
    this.setState({ filterData: FilterData })
    console.log("itemmm in title fliter list===>", FilterData)

  }

  FeedingFilterList(item) {
    let FilterData = [item]
    console.log("itemmm in feeding fliter list===>", FilterData)

  }

  GenderFilterList(item) {
    let FilterData = [item]
    this.setState({ filterData: FilterData })
    console.log("itemmm in gender fliter list===>", FilterData)

  }

  findProductsFilter() {
    console.log("whole filter data", this.state.priceValue, this.state.colorFilterData)
    this.setState({ isSelectFilter: "FindProducts" })
    NavService.navigate('home', 'DiscoverCategories');
    // if (this.state.priceValue && this.state.colorFilterData) {
    //   this.setState({ isloadingFilter: true })
    //   setTimeout(() => {
    //     NavService.navigate('home', 'DiscoverCategories');
    //     this.setState({ isloadingFilter: false })
    //   }, 300

    //   )
    // }
    // else {
    //   RNToasty.Error({
    //     title: "Please select color"
    //   })
    // }
  }

  clearProductFilter() {
    this.setState({ isSelectFilter: "ClearProducts", filterData: [] })
  }

  filterColorData(item, index) {
    this.setState({ colorFilterData: index })
    console.log("itemmmm ======>", item)
  }

  render() {
    console.log("discoverCategoryData", this.props.discoverCategoryReducer)
    if (this.props.discoverCategoryReducer.discoverCategoryLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image  source={require("../../../assets/images/gifloader.gif")}  />
        </View>
      )
    }
    else {
      return (
        <SafeAreaView style={styles.headerContainer}>
          {/* <View style={{ flex: 0.9, backgroundColor: "white" }}> */}
          <ScrollView
            style={{
              height: deviceHeight, width: deviceWidth,
              backgroundColor: "white"
            }}>

            {
              this.props.discoverCategoryReducer && this.props.discoverCategoryReducer.discoverCategoryData && this.props.discoverCategoryReducer.discoverCategoryData.attributeDetails.length > 0 ?
                this.props.discoverCategoryReducer.discoverCategoryData.attributeDetails.map((item, index) => {
                  return (
                    this.renderTitle(item, index)
                  )

                })
                :
                <View style={{ height: deviceHeight * 0.7, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ paddingVertical: '3%' }}>Something went wrong ..</Text>
                  <Text onPress={() => this.retryDiscoverProduct()} style={{ color: 'skyblue' }}>Retry</Text>
                </View>
            }


           { 
             this.props.discoverCategoryReducer && this.props.discoverCategoryReducer.discoverCategoryData && this.props.discoverCategoryReducer.discoverCategoryData.attributeDetails.length > 0 ?
           <View style={{ height: deviceHeight * 0.17, backgroundColor: "transparent", flexDirection: "row", paddingTop: '9%' }}>
              <View style={{ flex: 0.5, justifyContent: 'center', alignItems: "center" }}>
                <_Button
                  text="Clear all"
                  theme={this.state.isSelectFilter == "ClearProducts" ? "primary" : "secondary"}
                  onPress={() => {
                    this.clearProductFilter()
                  }}
                  halfButton={true}
                />
              </View>
              <View style={{ flex: 0.5, justifyContent: 'center', alignItems: "center" }}>
                <_Button
                  text="Find Products"
                  theme={this.state.isSelectFilter == "FindProducts" ? "primary" : "secondary"}
                  onPress={() => {
                    this.findProductsFilter()
                  }}
                  halfButton={true}
                />
              </View>
            </View>
            :
            null}

            {/* {this.renderGender(DummyJSON.DiscoverData.Gender)}
             {this.renderFeeding(DummyJSON.DiscoverData.Feeding)} */}
            {/* <_Separator />
            {this.renderMainMenu()}
            <_Separator />
            {this.renderSubMenu()}
            {this.renderAppSubMenu()}  */}

            {/* <DrawerItems {...this.props} getLabel={this.renderMenuItem} /> */}

          </ScrollView>
          {/* </View> */}

          {/* {
            this.state.isSelectFilter == "FindProducts" ?
              <View style={{ height: deviceHeight * 0.26, width: deviceWidth, position: "absolute", top: "55%", backgroundColor: "white", paddingHorizontal: 20 }}>
                <View style={{ backgroundColor: "white", paddingVertical: 13 }}>
                  <View style={{ justifyContent: "center", paddingVertical: 4 }}>
                    <Text style={{ color: "#848484", fontSize: 14, fontWeight: '700' }}>PRICE</Text>
                  </View>
                  <Slider
                    value={this.state.priceValue}
                    onValueChange={(priceValue) => this.setState({ priceValue })}
                    // trackStyle={{ color: "#003A51" }}
                    minimumValue={30}
                    maximumValue={500}
                    step={20}
                    thumbTintColor={"#003A51"}
                  />
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


          {/* <View style={{ flex: 0.1, backgroundColor: "transparent", flexDirection: "row" }}>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: "center" }}>
              <_Button
                text="Clear all"
                theme={this.state.isSelectFilter == "ClearProducts" ? "primary" : "secondary"}
                onPress={() => {
                  this.clearProductFilter()
                }}
                halfButton={true}
              />
            </View>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: "center" }}>
              <_Button
                text="Find Products"
                theme={this.state.isSelectFilter == "FindProducts" ? "primary" : "secondary"}
                onPress={() => {
                  this.findProductsFilter()
                }}
                halfButton={true}
              />
            </View>

          </View> */}

        </SafeAreaView>

      );
    }
  }
}

function mapStateToProps(state) {
  return {
    discoverCategoryReducer: state.discoverCategoryReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ discoverCategory }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover)

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white',

    justifyContent: 'space-around',
  },
});
