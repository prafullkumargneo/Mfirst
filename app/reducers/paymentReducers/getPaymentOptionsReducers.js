import {  GET_PAYMENT_OPTIONS_SUCCESS, GET_PAYMENT_OPTIONS_FAILURE, GET_PAYMENT_OPTIONS_LOADING } from '../../actions/api/types';

const initialState = {
   getPaymentOptionData: null,
   getPaymentOptionLoading: false,
   getPaymentOptionError: null
}

export default function getPaymentOptionsData(state = initialState, action) {
console.log("in getPaymentOptionsData",action.type,action.data)
    switch(action.type) {
        case GET_PAYMENT_OPTIONS_LOADING:
            return {
                ...state,
                getPaymentOptionLoading: true,
                getPaymentOptionData: null,
                getPaymentOptionError: null
            }
        case GET_PAYMENT_OPTIONS_SUCCESS:
            return {
                ...state,
                getPaymentOptionLoading: false,
                getPaymentOptionData: action.data,
                getPaymentOptionError:null
            }
        case GET_PAYMENT_OPTIONS_FAILURE:
            return {
                ...state,
                getPaymentOptionLoading: false,
                getPaymentOptionError: action.data,
                getPaymentOptionData:null
            }
        default:
            return state
    }
}