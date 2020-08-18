import {  ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAILURE, ORDER_DETAILS_LOADING} from '../../actions/api/types';

const initialState = {
    orderDetailsData: null,
    orderDetailsLoading: false,
    orderDetailsError: null
}

export default function orderDetailsReducer(state = initialState, action) {

    switch(action.type) {
        case ORDER_DETAILS_LOADING:
            return {
                ...state,
                orderDetailsLoading: true,
                orderDetailsData: null,
                orderDetailsError: null
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                orderDetailsLoading: false,
                orderDetailsData: action.data,
                orderDetailsError:null
            }
        case ORDER_DETAILS_FAILURE:
            return {
                ...state,
                orderDetailsLoading: false,
                orderDetailsError: action.data,
                orderDetailsData:null
            }
        default:
            return state
    }
}