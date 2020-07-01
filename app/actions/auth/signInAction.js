import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_IN_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function signIn(signInData) {
  let api = 'login=' + signInData.login + '&password=' + signInData.password
  console.log("signupsData:", api)
  return (dispatch) => {
    dispatch(signInLoading())
    return ApiCaller(ApiConstants.SIGNIN + api).then(res => {
      if (res && res.Data) {
        dispatch(signInSuccess(res.Data));
      } else {
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