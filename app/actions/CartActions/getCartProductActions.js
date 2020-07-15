import { GET_CART_SUCCESS, GET_CART_FAILURE, GET_CART_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function getCartProduct(getCartData) {
  console.log("getcart details",getCartData)
  let api = 'userId=' + getCartData.userId + '&orderId=' + getCartData.orderId;
  return (dispatch) => {
    dispatch(getCartProductLoading())
    return ApiCaller(ApiConstants.GETCART + api).then(res => {
        if (res && res.Data) {
          dispatch(getCartProductSuccess(res.Data));
        } else {
          dispatch(getCartProductFailure(res))
        }
      console.log("response of getcart api caller", res)
    })
  }

}

function getCartProductLoading() {

  return {
    type: GET_CART_LOADING
  }
}

function getCartProductSuccess(data) {

  return {
    type: GET_CART_SUCCESS,
    data
  }
}

function getCartProductFailure(data) {
  return {
    type: GET_CART_FAILURE,
    data
  }
}