import { Alert } from 'react-native';
import { GET_ORDER_LIST_SUCCESS, GET_ORDER_LIST_FAILURE, GET_ORDER_LIST_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';

export default function getorderList(orderListData) {
    console.log("order listing data", orderListData)
    let method = 'POST'
    return (dispatch) => {
        dispatch(getOrderListLoading())
        return ApiCaller(ApiConstants.ORDERLIST, method, orderListData).then(res => {
            // if (res && res.status == true) {
            //     dispatch(getOrderListSuccess(res));
            
            // } else {
            //     dispatch(getOrderListFailure(res))
            // }
            console.log("response of order list api", res)
        })

    }

}

function getOrderListLoading() {

    return {
        type: GET_ORDER_LIST_LOADING
    }
}

function getOrderListSuccess(data) {

    return {
        type: GET_ORDER_LIST_SUCCESS,
        data
    }
}

function getOrderListFailure(data) {
    return {
        type: GET_ORDER_LIST_FAILURE,
        data
    }
}