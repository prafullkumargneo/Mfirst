import { ADD_SHIPPING_ADDRESS_SUCCESS,ADD_SHIPPING_ADDRESS_FAILURE, ADD_SHIPPING_ADDRESS_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';
import NavService from '../../containers/navigators/navigationService';
import { RNToasty } from 'react-native-toasty';

export default function addshippingAddressAction(addshippingData) {
console.log("shipping data",addshippingData)
let method='POST'
  return (dispatch) => {
    dispatch(addshippingAddressLoading())
    return ApiCaller(ApiConstants.SHIPPINGADDRESS,method,addshippingData).then(res => {
        if (res && res.Data || res.success==true) {
          dispatch(addshippingAddressSuccess(res.Data));
          if(res.Data){
          RNToasty.Success({
            title: "Address added.",
            titleSize: 15
        })
      }else{
        RNToasty.Success({
          title: "Address Deleted.",
          titleSize: 15
      })
      }
         NavService.navigate('root','ShippingAddress')
        } else {
          dispatch(addshippingAddressFailure(res))
        }
      console.log("response of shipping  api caller", res)
    })
  }

}

function addshippingAddressLoading() {

  return {
    type: ADD_SHIPPING_ADDRESS_LOADING
  }
}

function addshippingAddressSuccess(data) {

  return {
    type: ADD_SHIPPING_ADDRESS_SUCCESS,
    data
  }
}

function addshippingAddressFailure(data) {
  return {
    type: ADD_SHIPPING_ADDRESS_FAILURE,
    data
  }
}