import { SELECTED_SHIPPING_ADDRESS_SUCCESS, SELECTED_SHIPPING_ADDRESS_FAILURE, SELECTED_SHIPPING_ADDRESS_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';
import NavService from '../../containers/navigators/navigationService';
import { RNToasty } from 'react-native-toasty';

export default function shippingAddressSelected(shippingSelectData) {
  console.log("shipping address Selected data", shippingSelectData)
  let method = 'POST'
  return (dispatch) => {
    dispatch(shippingSelectedAddressLoading())
    return ApiCaller(ApiConstants.SELECTEDSHIPPINGADDRESS, method, shippingSelectData).then(res => {
        if (res &&  res.success==true) {
          dispatch(shippingSelectedAddressSuccess(res));
           NavService.navigate('root', 'Payement')
    
        } else {
          dispatch(shippingSelectedAddressFailure(res))
          RNToasty.Error({
            title: "Something went wrong.Please try again",
            titleSize: 15
        })
        }
      console.log("response of add selected shipping  api caller", res)
    })
  }

}

function shippingSelectedAddressLoading() {

  return {
    type: SELECTED_SHIPPING_ADDRESS_LOADING
  }
}

function shippingSelectedAddressSuccess(data) {

  return {
    type: SELECTED_SHIPPING_ADDRESS_SUCCESS,
    data
  }
}

function shippingSelectedAddressFailure(data) {
  return {
    type: SELECTED_SHIPPING_ADDRESS_FAILURE,
    data
  }
}