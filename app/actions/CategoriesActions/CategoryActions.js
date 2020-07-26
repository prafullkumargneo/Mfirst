import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE, GET_CATEGORIES_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function categoryDetails(userId) {
  let api =  userId ?'?userId=' + userId:'' ;

  return (dispatch) => {
    dispatch(getCategoriesLoading())
    return ApiCaller(ApiConstants.GETCATEGORY + api).then(res => {
      if (res && res.data || res.reorderProducts) {
        dispatch(getCategorySuccess(res));
      } else {
        dispatch(getCategoryFailure(res))
      }
      console.log("response of custom api caller", res)
    })

  }

}

function getCategoriesLoading() {

  return {
    type: GET_CATEGORIES_LOADING
  }
}

function getCategorySuccess(data) {

  return {
    type: GET_CATEGORIES_SUCCESS,
    data
  }
}

function getCategoryFailure(data) {
  return {
    type: GET_CATEGORIES_FAILURE,
    data
  }
}