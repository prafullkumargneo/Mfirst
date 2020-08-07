import AsyncStorage from '@react-native-community/async-storage';
import { ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE, ADD_TO_CART_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';
import getCartProduct from './getCartProductActions';

export default function addToCart(cartData,order_id,status) {
  console.log('addtocartDataDetail',cartData,order_id,status)
  let method='POST'
  //let api = 'uid=' + cartData.uId + '&product_id=' + cartData.productId + '&qty=' + cartData.qty + '&qtyStatus=' + cartData.qtyStatus + '&token=' + cartData.token;
  return (dispatch) => {
    dispatch(addToCartLoading())
    return ApiCaller(ApiConstants.ADDTOCART,method,cartData).then(res => {
        if (res && res.data) {
          AsyncStorage.setItem('OrderId',JSON.stringify(res.data));
          AsyncStorage.getItem('OrderId').then(value => {
           console.log("value of cart data",value)
          });
          dispatch(addToCartSuccess(res));
          if(status==="removeProduct"){
          dispatch(getCartProduct({ userId: cartData.userId, orderId: order_id }))
          }
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