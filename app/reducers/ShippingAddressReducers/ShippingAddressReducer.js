import { SHIPPING_ADDRESS_SUCCESS,SHIPPING_ADDRESS_FAILURE, SHIPPING_ADDRESS_LOADING } from '../../actions/api/types';

const initialState = {
    shippingAddressData: null,
    shippingAddressLoading: false,
    shippingAddressError: null
}

export default function shippingAddressReducer(state = initialState, action) {
console.log("in reducer of shipping",action.type,action.data)
    switch(action.type) {
        case SHIPPING_ADDRESS_LOADING:
            return {
                ...state,
                shippingAddressLoading: true,
                shippingAddressData: null,
                shippingAddressError: null
            }
        case SHIPPING_ADDRESS_SUCCESS:
            return {
                ...state,
                shippingAddressLoading: false,
                shippingAddressData: action.data,
                shippingAddressError:null
            }
        case SHIPPING_ADDRESS_FAILURE:
            return {
                ...state,
                shippingAddressLoading: false,
                shippingAddressError: action.data,
                shippingAddressData:null
            }
        default:
            return state
    }
}