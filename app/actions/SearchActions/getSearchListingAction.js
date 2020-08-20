import { GET_SEARCH_LIST_SUCCESS, GET_SEARCH_LIST_FAILURE,GET_SEARCH_LIST_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function getSearchList() {

  return (dispatch) => {
    dispatch(getSearchListLoading())
    return ApiCaller(ApiConstants.GETSEARCHLIST).then(res => {
      if (res && res.data) {
        dispatch(getSearchListSuccess(res.data));
      } else {
        dispatch(getSearchListFailure(res))
      }
      console.log("response of search api caller", res)
    })

  }

}

function getSearchListLoading() {

  return {
    type: GET_SEARCH_LIST_LOADING
  }
}

function getSearchListSuccess(data) {

  return {
    type: GET_SEARCH_LIST_SUCCESS,
    data
  }
}

function getSearchListFailure(data) {
  return {
    type: GET_SEARCH_LIST_FAILURE,
    data
  }
}