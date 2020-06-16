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
  FlatList, TouchableOpacity, ScrollView, Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
import  fetchTodos  from '../../../actions/TestActions';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesFlag: false,
      categoriesDescriptionArray: DummyJSON.categoriesData,
      categoriesindex: [],
      password: '',
    };
  }
  
  componentDidMount() {

    this.props.fetchTodos()

}

  categoriesDescription(index) {
    console.log("indexx of prop", index)
    console.log("categories", this.state.categoriesDescriptionArray[index])
    this.setState({ categoriesindex: index })
  }
  _keyExtractor = (item, index) => item._id.toString();

  _renderCategoriesList = ({ item, index }) => {
    console.log("item", item)
    return (
      <View style={{ backgroundColor: "#EEEEEE" }}>

        <TouchableOpacity onPress={() => { this.categoriesDescription(index) }} style={{ backgroundColor: "white", paddingVertical: 3, margin: 2 }}>
          <View style={{ flexDirection: 'row', paddingVertical: 3, paddingHorizontal: 13 }}>
            <View style={{ flex: 0.3 }}>
              <Image style={{ height: deviceHeight * 0.1, width: deviceWidth * 0.2, borderRadius: 70 }} source={{ uri: 'https://picsum.photos/200/300' }} />

            </View>
            <View style={{ flex: 0.6, justifyContent: "center" }}>

              <Text style={{ color: "#393939", fontSize: 16, fontWeight: "700" }}>{item.name}</Text>
            </View>
            <View style={{ flex: 0.1, alignItems: "flex-end", margin: 3, justifyContent: "center" }}>
              {this.state.categoriesindex === index ? <Icon size={24} color="#3FC1C9" name="ios-arrow-up" /> : <Icon size={24} color="#3FC1C9" name="ios-arrow-down" />}
            </View>

          </View>
        </TouchableOpacity>
        <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: "row", backgroundColor: "white" }}>
          {this.state.categoriesindex === index ?
            item.description && item.description.map((item) => {
              return (
                <View style={{ height: deviceHeight * 0.21, justifyContent: "center", paddingHorizontal: 15, left: "10%" }}>
                  <View style={{ paddingVertical: 10 }}>
                    <Image style={{ height: deviceHeight * 0.1, width: deviceWidth * 0.2, borderRadius: 70 }} source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    {item.split(' ').map((item, i) => <Text style={{ justifyContent: "space-between", color: "#2B2B2B", fontSize: 13 }}>{item}</Text>)}
                  </View>

                </View>


              )
            })

            : null}
        </ScrollView>
      </View>
    )
  }
  render() {
    console.log("dummyjson", this.props.todosReducer)
    return (
      <SafeAreaView style={[appStyles.container]}>
        <View
          style={{
            flex: 1,
            backgroundColor: "yellow"
          }}
        >
          <View style={{ flex: 0.25, backgroundColor: "red" }}>
            <Swiper style={styles.wrapper} showsButtons={true}>
              <View style={styles.slide1}>
                <Image style={{ width: deviceWidth * 1, height: deviceHeight * 0.28 }} source={{ uri: "https://picsum.photos/seed/picsum/200/300" }} />

              </View>
              <View style={styles.slide2}>
                <Image style={{ width: deviceWidth, height: deviceHeight }} source={{ uri: "https://i.picsum.photos/id/631/200/300.jpg" }} />
              </View>
              <View style={styles.slide3}>
                <Image style={{ width: deviceWidth * 0.97, height: deviceHeight * 0.2 }} source={{ uri: "https://picsum.photos/id/870/200/300?grayscale&blur=2" }} />

              </View>
            </Swiper>
          </View>

          <View style={{ flex: 0.75, backgroundColor: "orange" }}>
            <FlatList
              data={DummyJSON.categoriesData}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderCategoriesList}
            />
          </View>

        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    todosReducer: state.todosReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
      ...bindActionCreators({ fetchTodos }, dispatch)
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
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
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

