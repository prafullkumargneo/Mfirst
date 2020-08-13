import { Alert } from 'react-native';
import { GET_REVIEW_ORDER_SUCCESS, GET_REVIEW_ORDER_FAILURE, GET_REVIEW_ORDER_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function getReviewOrder(reviewOrderData) {
    console.log("review order data", reviewOrderData)
    let method = 'POST'
    return (dispatch) => {
        dispatch(getReviewOrderLoading())
        return ApiCaller(ApiConstants.REVIEWORDER, method, reviewOrderData).then(res => {
            if (res && res.data ) {
                dispatch(getReviewOrderSuccess(res.data));
            } else {
                dispatch(getReviewOrderFailure(res))
            }
            console.log("response of review order details api", res)
        })

    }

}

function getReviewOrderLoading() {

    return {
        type: GET_REVIEW_ORDER_LOADING
    }
}

function getReviewOrderSuccess(data) {

    return {
        type: GET_REVIEW_ORDER_SUCCESS,
        data
    }
}

function getReviewOrderFailure(data) {
    return {
        type: GET_REVIEW_ORDER_FAILURE,
        data
    }
}