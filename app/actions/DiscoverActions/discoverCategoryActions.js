import {DISCOVER_CATEGORY_SUCCESS,DISCOVER_CATEGORY_FAILURE, DISCOVER_CATEGORY_LOADING} from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function discoverCategory() {
    console.log("discoverCategory details")
    return (dispatch) => {
        dispatch(discoverCategoryLoading())
        return ApiCaller(ApiConstants.DISCOVERCATEFORY).then(res => {
            if (res && res.data) {
                dispatch(discoverCategorySuccess(res.data));
            } else {
                dispatch(discoverCategoryFailure(res))
            }
            console.log("response of discovercategory api caller", res)
        })
    }

}

function discoverCategoryLoading() {

    return {
        type: DISCOVER_CATEGORY_LOADING
    }
}

function discoverCategorySuccess(data) {

    return {
        type: DISCOVER_CATEGORY_SUCCESS,
        data
    }
}

function discoverCategoryFailure(data) {
    return {
        type: DISCOVER_CATEGORY_FAILURE,
        data
    }
}