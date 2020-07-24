import { TRENDING_CATEGORIES_PRODUCT_SUCCESS, TRENDING_CATEGORIES_PRODUCT_FAILURE, TRENDING_CATEGORIES_PRODUCT_LOADING } from  '../../actions/api/types';

const initialState = {
    trendingCategoryProductData: null,
    trendingCategoryProductLoading: false,
    trendingCategoryProductError: null
}

export default function trendingCategoryProductReducers(state = initialState, action) {
    switch(action.type) {
        case TRENDING_CATEGORIES_PRODUCT_LOADING:
            return {
                ...state,
                trendingCategoryProductLoading: true
            }
        case TRENDING_CATEGORIES_PRODUCT_SUCCESS:
            return {
                ...state,
                trendingCategoryProductLoading: false,
                trendingCategoryProductData: action.data,
                trendingCategoryProductError:null
            }
        case TRENDING_CATEGORIES_PRODUCT_FAILURE:
            return {
                ...state,
                trendingCategoryProductLoading: false,
                trendingCategoryProductError: action.data,
                trendingCategoryProductData:null
            }
        default:
            return state
    }
}