import { Alert } from 'react-native';
import { PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILURE, PRODUCT_DETAILS_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function productDetailsActions(productId) {
  return (dispatch) => {
    dispatch(productDetailsLoading())
    return ApiCaller(ApiConstants.PRODUCT_DETAILS + productId).then(res => {
      if (res && res.Data) {
        dispatch(productDetailsSuccess(res.Data));
      } else {
        dispatch(productDetailsFailure(res.error))
      }
      console.log("response of product details api", res)
    })

  }

}

function productDetailsLoading() {

  return {
    type: PRODUCT_DETAILS_LOADING
  }
}

function productDetailsSuccess(data) {

  return {
    type: PRODUCT_DETAILS_SUCCESS,
    data
  }
}

function productDetailsFailure(data) {
  return {
    type: PRODUCT_DETAILS_FAILURE,
    data
  }
}