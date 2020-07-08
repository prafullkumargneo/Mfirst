import { GET_CART_SUCCESS, GET_CART_FAILURE, GET_CART_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function getCartProduct(cartData) {
  let api = 'uid=' + cartData.uId + '&product_id=' + cartData.productId + '&qty=' + cartData.qty + '&qtyStatus=' + cartData.qtyStatus + '&token=' + cartData.token;
  return (dispatch) => {
    dispatch(getCartProductLoading())
    return ApiCaller(ApiConstants.GETCART + api).then(res => {
        // if (res && res.data) {
        //   dispatch(getCartProductSuccess(res.data));
        // } else {
        //   dispatch(getCartProductFailure(res))
        // }
      console.log("response of cart api caller", res)
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