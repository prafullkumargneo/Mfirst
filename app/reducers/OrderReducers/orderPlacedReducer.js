import {  ORDER_PLACED_SUCCESS, ORDER_PLACED_FAILURE, ORDER_PLACED_LOADING } from '../../actions/api/types';

const initialState = {
   orderPlacedData: null,
   orderPlacedLoading: false,
   orderPlacedError: null
}

export default function orderPlacedReducer(state = initialState, action) {

    switch(action.type) {
        case ORDER_PLACED_LOADING:
            return {
                ...state,
                orderPlacedLoading: true,
                orderPlacedData: null,
                orderPlacedError: null
            }
        case ORDER_PLACED_SUCCESS:
            return {
                ...state,
                orderPlacedLoading: false,
                orderPlacedData: action.data,
                orderPlacedError:null
            }
        case ORDER_PLACED_FAILURE:
            return {
                ...state,
                orderPlacedLoading: false,
                orderPlacedError: action.data,
                orderPlacedData:null
            }
        default:
            return state
    }
}