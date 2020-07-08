import { ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE, ADD_TO_CART_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function addToCart(cartData) {
  let api = 'uid=' + cartData.uId + '&product_id=' + cartData.productId + '&qty=' + cartData.qty + '&qtyStatus=' + cartData.qtyStatus + '&token=' + cartData.token;
  return (dispatch) => {
    dispatch(addToCartLoading())
    return ApiCaller(ApiConstants.ADDTOCART + api).then(res => {
        if (res && res.data) {
          dispatch(addToCartSuccess(res.data));
        } else {
          dispatch(addToCartFailure(res))
        }
      console.log("response of cart api caller", res)
    })
  }

}

function addToCartLoading() {

  return {
    type: ADD_TO_CART_LOADING
  }
}

function addToCartSuccess(data) {

  return {
    type: ADD_TO_CART_SUCCESS,
    data
  }
}

function addToCartFailure(data) {
  return {
    type: ADD_TO_CART_FAILURE,
    data
  }
}