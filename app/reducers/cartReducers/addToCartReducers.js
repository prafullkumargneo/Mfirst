import { ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE, ADD_TO_CART_LOADING } from '../../actions/api/types';

const initialState = {
    addToCartData: null,
    addToCartLoading: false,
    addToCartError: null
}

export default function addToCartReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TO_CART_LOADING:
            return {
                ...state,
                addToCartLoading: true
            }
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                addToCartLoading: false,
                addToCartData: action.data
            }
        case ADD_TO_CART_FAILURE:
            return {
                ...state,
                addToCartLoading: false,
                addToCartError: action.data
            }
        default:
            return state
    }
}