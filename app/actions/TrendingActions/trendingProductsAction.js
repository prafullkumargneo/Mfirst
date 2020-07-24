import { TRENDING_PRODUCT_SUCCESS, TRENDING_PRODUCT_FAILURE, TRENDING_PRODUCT_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function trendingProductsAction() {
    console.log("Trending Products")
    return (dispatch) => {
        dispatch(trendingProductLoading())
        return ApiCaller(ApiConstants.TRENDINGPRODUCT).then(res => {
            if (res && res.data) {
                dispatch(trendingProductSuccess(res.data));
            } else {
                dispatch(trendingProductFailure(res))
            }
            console.log("response of trending api caller", res)
        })
    }

}

function trendingProductLoading() {

    return {
        type: TRENDING_PRODUCT_LOADING
    }
}

function trendingProductSuccess(data) {

    return {
        type: TRENDING_PRODUCT_SUCCESS,
        data
    }
}

function trendingProductFailure(data) {
    return {
        type: TRENDING_PRODUCT_FAILURE,
        data
    }
}