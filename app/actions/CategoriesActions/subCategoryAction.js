import { SUB_CATEGORIES_SUCCESS, SUB_CATEGORIES_FAILURE,SUB_CATEGORIES_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function subcategoryDetails(categoryid) {
  return (dispatch) => {
    dispatch(subCategoriesLoading())
    return ApiCaller(ApiConstants.SUBCATEGORY+categoryid).then(res => {
      if (res && res.data) {
        dispatch(subCategorySuccess(res.data));
      } else {
        dispatch(subCategoryFailure(res))
      }
      console.log("response of subcategory api caller", res)
    })
 
  }

}

function subCategoriesLoading() {

  return {
    type: SUB_CATEGORIES_LOADING
  }
}

function subCategorySuccess(data) {

  return {
    type: SUB_CATEGORIES_SUCCESS,
    data
  }
}

function subCategoryFailure(data) {
  return {
    type: SUB_CATEGORIES_FAILURE,
    data
  }
}