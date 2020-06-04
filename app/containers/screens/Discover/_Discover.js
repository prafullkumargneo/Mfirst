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
import DiscoverCategories from './_DiscoverCategories'

export default class Discover extends Component {
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


  _keyExtractor = (item, index) => item._id;

  _renderDiscoverTitleList = ({ item, index }) => {
    console.log("item of discover", item, this.state.isTitlecheckedindex)
    return (
      <TitleDiscover Content={item} ContentIndex={index} callbackTitleList={(item) => this.TitlefilterList(item)} />
    )
  }
  renderTitle(DummyJSON) {

    return (
      <View style={{ backgroundColor: "white", paddingHorizontal: 25, justifyContent: "center", paddingVertical: 15 }} >
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ color: "#848484", fontSize: 15, fontWeight: '700' }}>{DummyJSON.headername}</Text>
        </View>
        <FlatList
          horizontal
          data={DummyJSON.titleDescription}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderDiscoverTitleList}
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
    if (this.state.priceValue && this.state.colorFilterData) {
      this.setState({ isloadingFilter: true })
      setTimeout(() => {
        NavService.navigate('home', 'DiscoverCategories');
        this.setState({ isloadingFilter: false })
      }, 300

      )
    }
    else {
      RNToasty.Error({
        title: "Please select color"
      })
    }
  }

  clearProductFilter() {
    this.setState({ isSelectFilter: "ClearProducts" })
  }

  filterColorData(item, index) {
    this.setState({ colorFilterData: index })
    console.log("itemmmm ======>", item)
  }

  render() {
    console.log("dummy data", DummyJSON, this.state.filterData, this.state.isloadingFilter)
    if (this.state.isloadingFilter) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator animating={true} color={"#003a51"} size={"large"} />
        </View>
      )
    }
    else {
      return (
        <SafeAreaView style={styles.headerContainer}>
          <View style={{ flex: 0.85, backgroundColor: "yellow" }}>
            <ScrollView
              contentContainerStyle={{
                height: deviceHeight, width: deviceWidth,
                backgroundColor: "white"
              }}>

              {this.renderTitle(DummyJSON.DiscoverData.Title)}
              {this.renderGender(DummyJSON.DiscoverData.Gender)}
              {this.renderFeeding(DummyJSON.DiscoverData.Feeding)}
              {/* <_Separator />
            {this.renderMainMenu()}
            <_Separator />
            {this.renderSubMenu()}
            {this.renderAppSubMenu()}  */}

              {/* <DrawerItems {...this.props} getLabel={this.renderMenuItem} /> */}

            </ScrollView>
          </View>

          {
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
          }


          <View style={{ flex: 0.15, backgroundColor: "white", flexDirection: "row", borderTopWidth: 0.5, borderTopColor: '#848484' }}>
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

        </SafeAreaView>

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
});
