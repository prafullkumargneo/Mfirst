import { SELECTED_SHIPPING_ADDRESS_SUCCESS, SELECTED_SHIPPING_ADDRESS_FAILURE, SELECTED_SHIPPING_ADDRESS_LOADING } from  '../../actions/api/types';

const initialState = {
    SelectedshippingAddressData: null,
    SelectedshippingAddresLoading: false,
    SelectedshippingAddresError: null
}

export default function SelectedshippingAddressReducer(state = initialState, action) {
console.log("in reducer of shipping",action.type,action.data)
    switch(action.type) {
        case SELECTED_SHIPPING_ADDRESS_LOADING:
            return {
                ...state,
                SelectedshippingAddresLoading: true,
                SelectedshippingAddresError: null,
                SelectedshippingAddressData: null,
            }
        case SELECTED_SHIPPING_ADDRESS_SUCCESS:
            return {
                ...state,
                SelectedshippingAddresLoading: false,
                SelectedshippingAddressData: action.data,
                SelectedshippingAddresError: null
            }
        case SELECTED_SHIPPING_ADDRESS_FAILURE:
            return {
                ...state,
                SelectedshippingAddresLoading: false,
                SelectedshippingAddresError: action.data,
                SelectedshippingAddressData: null,
            }
        default:
            return state
    }
}