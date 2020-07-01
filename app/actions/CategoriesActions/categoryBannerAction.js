import { BANNER_CATEGORIES_SUCCESS, BANNER_CATEGORIES_FAILURE,BANNER_CATEGORIES_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function bannerCategory() {
  return (dispatch) => {
    dispatch(bannerCategoriesLoading())
    return ApiCaller(ApiConstants.BANNERCATEGORY).then(res => {
      if (res && res.data) {
        dispatch(bannerCategorySuccess(res));
      } else {
        dispatch(bannerCategoryFailure(res))
      }
      console.log("response of banner api", res)
    })
 
  }

}

function bannerCategoriesLoading() {

  return {
    type: BANNER_CATEGORIES_LOADING
  }
}

function bannerCategorySuccess(data) {

  return {
    type: BANNER_CATEGORIES_SUCCESS,
    data
  }
}

function bannerCategoryFailure(data) {
  return {
    type: BANNER_CATEGORIES_FAILURE,
    data
  }
}