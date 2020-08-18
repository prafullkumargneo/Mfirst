import {  GET_ORDER_LIST_SUCCESS, GET_ORDER_LIST_FAILURE, GET_ORDER_LIST_LOADING } from '../../actions/api/types';

const initialState = {
    orderListingData: null,
    orderListingLoading: false,
    orderListingError: null
}

export default function orderListingReducer(state = initialState, action) {

    switch(action.type) {
        case GET_ORDER_LIST_LOADING:
            return {
                ...state,
                orderListingLoading: true,
                orderListingData: null,
                orderListingError: null
            }
        case GET_ORDER_LIST_SUCCESS:
            return {
                ...state,
                orderListingLoading: false,
                orderListingData: action.data,
                orderListingError:null
            }
        case GET_ORDER_LIST_FAILURE:
            return {
                ...state,
                orderListingLoading: false,
                orderListingError: action.data,
                orderListingData:null
            }
        default:
            return state
    }
}