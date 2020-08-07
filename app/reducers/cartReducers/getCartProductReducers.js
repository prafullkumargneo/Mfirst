import { GET_CART_SUCCESS, GET_CART_FAILURE, GET_CART_LOADING } from '../../actions/api/types';

const initialState = {
    getCartProductData: null,
    getCartProductLoading: false,
    getCartProductError: null
}

export default function getCartProductReducer(state = initialState, action) {
    switch(action.type) {
        case GET_CART_LOADING:
            return {
                ...state,
                getCartProductLoading: true,
                getCartProductError: null,
                getCartProductData: null,
            }
        case GET_CART_SUCCESS:
            return {
                ...state,
                getCartProductLoading: false,
                getCartProductData: action.data
            }
        case GET_CART_FAILURE:
            return {
                ...state,
                getCartProductLoading: false,
                getCartProductError: action.data
            }
        default:
            return state
    }
}