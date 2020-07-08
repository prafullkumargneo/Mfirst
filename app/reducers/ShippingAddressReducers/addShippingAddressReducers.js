import { ADD_SHIPPING_ADDRESS_SUCCESS,ADD_SHIPPING_ADDRESS_FAILURE, ADD_SHIPPING_ADDRESS_LOADING } from  '../../actions/api/types';

const initialState = {
    addShippingAddressData: null,
    addShippingAddressLoading: false,
    addShippingAddressError: null
}

export default function addshippingAddressReducer(state = initialState, action) {
console.log("in reducer of shipping",action.type,action.data)
    switch(action.type) {
        case ADD_SHIPPING_ADDRESS_LOADING:
            return {
                ...state,
                addShippingAddressLoading: true
            }
        case ADD_SHIPPING_ADDRESS_SUCCESS:
            return {
                ...state,
                addShippingAddressLoading: false,
                addShippingAddressData: action.data
            }
        case ADD_SHIPPING_ADDRESS_FAILURE:
            return {
                ...state,
                addShippingAddressLoading: false,
                addShippingAddressError: action.data
            }
        default:
            return state
    }
}