import { TRENDING_CATEGORIES_PRODUCT_SUCCESS, TRENDING_CATEGORIES_PRODUCT_FAILURE, TRENDING_CATEGORIES_PRODUCT_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function trendingCategoryDetails(categoryid) {
    let method='POST'
    return (dispatch) => {
        dispatch(trendingCategoriesProductsLoading())
        return ApiCaller(ApiConstants.TRENDINGCATEGORY + categoryid,method,null).then(res => {
              if (res && res.Data) {
                dispatch(trendingCategoriesProductsSuccess(res.Data));
              } else {
                dispatch(trendingCategoriesProductsFailure(res))
              }

        })

    }

}

function trendingCategoriesProductsLoading() {

    return {
        type: TRENDING_CATEGORIES_PRODUCT_LOADING
    }
}

function trendingCategoriesProductsSuccess(data) {

    return {
        type: TRENDING_CATEGORIES_PRODUCT_SUCCESS,
        data
    }
}

function trendingCategoriesProductsFailure(data) {
    return {
        type: TRENDING_CATEGORIES_PRODUCT_FAILURE,
        data
    }
}