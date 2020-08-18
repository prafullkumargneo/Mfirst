import { Alert } from 'react-native';
import { ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAILURE, ORDER_DETAILS_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function orderDetails(orderDetailsData) {
    console.log("order details data", orderDetailsData)
    let method = 'POST'
    return (dispatch) => {
        dispatch(getOrderDetailsLoading())
        return ApiCaller(ApiConstants.ORDERDETAILS, method, orderDetailsData).then(res => {
            if (res && res.data ) {
                dispatch(getOrderDetailsSuccess(res.data));
            
            } else {
                dispatch(getOrderDetailsFailure(res))
            }
            console.log("response of order details api", res)
        })

    }

}

function getOrderDetailsLoading() {

    return {
        type: ORDER_DETAILS_LOADING
    }
}

function getOrderDetailsSuccess(data) {

    return {
        type: ORDER_DETAILS_SUCCESS,
        data
    }
}

function getOrderDetailsFailure(data) {
    return {
        type: ORDER_DETAILS_FAILURE,
        data
    }
}