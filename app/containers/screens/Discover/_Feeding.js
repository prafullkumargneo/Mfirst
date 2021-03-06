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
  FlatList
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class FeedingDiscover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFeedingcheckedindex:false
    };
  }

  
  Titlestatus(index,item){
    let feedingData= item &&!this.state.isFeedingcheckedindex ?item:null     
    this.setState({isFeedingcheckedindex:!this.state.isFeedingcheckedindex})
      this.props.callbackTitleList(feedingData)

  }



  render() {
    console.log("dummy data", this.props.Content,this.props.ContentIndex)
    let contentIndex=this.props.ContentIndex
    let contentItem=this.props.Content
    return (
        <View>
        {/* {item.split(' ').map((item, i) =>  */}
        <TouchableOpacity onPress={()=>{this.Titlestatus(contentIndex,contentItem)}}>
          <View style={{ height: 76, width: 83, backgroundColor: this.state.isFeedingcheckedindex ? "#E9F8FB" : "white", borderRadius: 20, justifyContent: "center", alignItems: "center", margin: 5,borderWidth:1,borderColor:"#003A51" }}>
          <Icon size={40} color="black" name="food" />
          </View>
          <View>
          {contentItem.split(' ').map((item, i) =>   <Text style={{ textAlign: 'center', fontSize: 13,color: "#848484" }}>{item}</Text>)}
          
          </View>
        </TouchableOpacity>
        {/* )} */}

      </View>

    );
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
