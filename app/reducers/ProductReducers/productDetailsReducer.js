import { PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILURE, PRODUCT_DETAILS_LOADING } from '../../actions/api/types';

const initialState = {
    productDetailData: null,
    productDetailLoading: false,
    productDetailerror: null
}

export default function productDetailReducer(state = initialState, action) {

    switch(action.type) {
        case PRODUCT_DETAILS_LOADING:
            return {
                ...state,
                productDetailLoading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                productDetailLoading: false,
                productDetailData: action.data
            }
        case PRODUCT_DETAILS_FAILURE:
            return {
                ...state,
                productDetailLoading: false,
                productDetailerror: action.data
            }
        default:
            return state
    }
}