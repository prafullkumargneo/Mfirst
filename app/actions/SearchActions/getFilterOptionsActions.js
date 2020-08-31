import { GET_FILTER_OPTION_SUCCESS, GET_FILTER_OPTION_FAILURE,GET_FILTER_OPTION_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function getFilterOption(categoryId) {
console.log("filter category id",categoryId)
let method='POST'
  return (dispatch) => {
    dispatch(getFilterOptionLoading())
    return ApiCaller(ApiConstants.GETFILTEROPTION,method,categoryId).then(res => {
      if (res && res.data) {
        dispatch(getFilterOptionSuccess(res.data));
      } else {
        dispatch(getFilterOptionFailure(res))
      }
      console.log("response of filter api caller", res)
    })

  }

}

function getFilterOptionLoading() {

  return {
    type: GET_FILTER_OPTION_LOADING
  }
}

function getFilterOptionSuccess(data) {

  return {
    type: GET_FILTER_OPTION_SUCCESS,
    data
  }
}

function getFilterOptionFailure(data) {
  return {
    type: GET_FILTER_OPTION_FAILURE,
    data
  }
}