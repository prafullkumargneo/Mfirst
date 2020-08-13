import { Alert } from 'react-native';
import { ORDER_PLACED_SUCCESS, ORDER_PLACED_FAILURE, ORDER_PLACED_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';
import { RNToasty } from 'react-native-toasty';
import NavService from '../../containers/navigators/navigationService';

export default function orderPlaced(orderPlacedData) {
    console.log("order placed data", orderPlacedData)
    let method = 'POST'
    return (dispatch) => {
        dispatch(orderPlacedLoading())
        return ApiCaller(ApiConstants.ORDERPLACED, method, orderPlacedData).then(res => {
            if (res && res.status == true) {
                dispatch(gorderPlacedSuccess(res));
                RNToasty.Success({
                    title: "Your order has been processed.",
                    titleSize: 15
                }), NavService.navigate('root', 'OrderAccepted')
            } else {
                dispatch(orderPlacedFailure(res))
            }
            console.log("response of order placed api", res)
        })

    }

}

function orderPlacedLoading() {

    return {
        type: ORDER_PLACED_LOADING
    }
}

function gorderPlacedSuccess(data) {

    return {
        type: ORDER_PLACED_SUCCESS,
        data
    }
}

function orderPlacedFailure(data) {
    return {
        type: ORDER_PLACED_FAILURE,
        data
    }
}