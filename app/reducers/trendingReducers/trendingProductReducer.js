import { TRENDING_PRODUCT_SUCCESS,TRENDING_PRODUCT_FAILURE, TRENDING_PRODUCT_LOADING } from  '../../actions/api/types';

const initialState = {
    trendingProductData: null,
    trendingProductLoading: false,
    trendingProductError: null
}

export default function trendingProductReducers(state = initialState, action) {
    switch(action.type) {
        case TRENDING_PRODUCT_LOADING:
            return {
                ...state,
                trendingProductLoading: true
            }
        case TRENDING_PRODUCT_SUCCESS:
            return {
                ...state,
                trendingProductLoading: false,
                trendingProductData: action.data,
                trendingProductError:null
            }
        case TRENDING_PRODUCT_FAILURE:
            return {
                ...state,
                trendingProductLoading: false,
                trendingProductError: action.data,
                trendingProductData:null
            }
        default:
            return state
    }
}