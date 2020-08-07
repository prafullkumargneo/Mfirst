import { GET_PAYMENT_OPTIONS_SUCCESS, GET_PAYMENT_OPTIONS_FAILURE, GET_PAYMENT_OPTIONS_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';
import NavService from '../../containers/navigators/navigationService';
import { RNToasty } from 'react-native-toasty';

export default function getPaymentOptions(paymentOptions) {
  console.log("PaymentOptions", paymentOptions)
  let method = 'POST'
  return (dispatch) => {
   dispatch(getPaymentOptionsLoading())
    return ApiCaller(ApiConstants.GETPAYMENTOPTIONS, method, paymentOptions).then(res => {
        if (res &&  res.data) {
          dispatch(getPaymentOptionsSuccess(res.data));
        } else {
          dispatch(getPaymentOptionsFailure(res))
       
        }
      console.log("response of add selected shipping  api caller", res)
    })
  }

}

function getPaymentOptionsLoading() {

  return {
    type: GET_PAYMENT_OPTIONS_LOADING
  }
}

function getPaymentOptionsSuccess(data) {

  return {
    type: GET_PAYMENT_OPTIONS_SUCCESS,
    data
  }
}

function getPaymentOptionsFailure(data) {
  return {
    type: GET_PAYMENT_OPTIONS_FAILURE,
    data
  }
}