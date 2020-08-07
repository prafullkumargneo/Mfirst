import { SHIPPING_ADDRESS_SUCCESS,SHIPPING_ADDRESS_FAILURE, SHIPPING_ADDRESS_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function shippingAddressAction(addshippingData) {
console.log("shipping data",addshippingData)
let method='POST'
  return (dispatch) => {
    dispatch(shippingAddressLoading())
    return ApiCaller(ApiConstants.SHIPPINGADDRESS,method,addshippingData).then(res => {
        if (res && res.data) {
          dispatch(shippingAddressSuccess(res.data));
        } else {
          dispatch(shippingAddressFailure(res))
        }
      console.log("response of shipping  api caller", res)
    })
  }

}

function shippingAddressLoading() {

  return {
    type: SHIPPING_ADDRESS_LOADING
  }
}

function shippingAddressSuccess(data) {

  return {
    type: SHIPPING_ADDRESS_SUCCESS,
    data
  }
}

function shippingAddressFailure(data) {
  return {
    type: SHIPPING_ADDRESS_FAILURE,
    data
  }
}