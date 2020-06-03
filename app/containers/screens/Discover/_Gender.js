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
import Icon from 'react-native-vector-icons/Fontisto';

export default class GenderDiscover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGendercheckedindex:false
    };
  }

  
  Genderstatus(index,item){
    let genderData= item &&!this.state.isGendercheckedindex ?item:null
      this.setState({isGendercheckedindex:!this.state.isGendercheckedindex})
      this.props.callbackTitleList(genderData)
  }



  render() {
    console.log("dummy data", this.props.Content,this.props.ContentIndex)
    let contentIndex=this.props.ContentIndex
    let contentItem=this.props.Content
    return (
        <View>
        {/* {item.split(' ').map((item, i) =>  */}
        <TouchableOpacity onPress={()=>{this.Genderstatus(contentIndex,contentItem)}}>
          <View style={{ height: 76, width: 83, backgroundColor: this.state.isGendercheckedindex ? "#E9F8FB" : "white", borderRadius: 20, justifyContent: "center", alignItems: "center", margin: 5,borderWidth:1,borderColor:"#003A51" }}>
          <Icon size={40} color="black" name="male" />
          </View>
          <View>
            <Text style={{ textAlign: 'center', fontSize: 13,color: "#848484" }}>{contentItem}</Text>
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
