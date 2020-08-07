import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_IN_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';
import NavService from '../../containers/navigators/navigationService';
import drawerProfile from '../DrawerAction/drawerProfileAction';
import { RNToasty } from 'react-native-toasty';
import categoryDetails from "../CategoriesActions/CategoryActions";

export default function signIn(signInData) {
  let api = 'login=' + signInData.login + '&password=' + signInData.password
  console.log("signupsData:", signInData)
  let method = 'POST'
  return (dispatch) => {
    dispatch(signInLoading())
    return ApiCaller(ApiConstants.SIGNIN ,method,signInData).then(res => {
      if (res && res.data) {
        console.log("in signin api response", res)
        dispatch(signInSuccess(res.data));
        AsyncStorage.setItem('LoggedInData', JSON.stringify(res.data));
        dispatch(categoryDetails(res.Data.userId));
        AsyncStorage.getItem('LoggedInData').then(value => {

          console.log("value of async", value)
        });
        dispatch(drawerProfile(res))
        NavService.navigate('root', 'MainDrawer');
      } else {
        RNToasty.Error({
          title: res.error,
          titleSize: 15
        })
        // Alert.alert('Error',res.error)
        dispatch(signInFailure(res))
      }
      console.log("response of custom api caller", res)
    })
  }
}

function signInLoading() {

  return {
    type: SIGN_IN_LOADING
  }
}

function signInSuccess(data) {

  return {
    type: SIGN_IN_SUCCESS,
    data
  }
}

function signInFailure(data) {
  return {
    type: SIGN_IN_FAILURE,
    data
  }
}