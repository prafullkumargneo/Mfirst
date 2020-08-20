import { BANNER_CATEGORIES_SUCCESS, BANNER_CATEGORIES_FAILURE,BANNER_CATEGORIES_LOADING } from '../../actions/api/types';

const initialState = {
    bannerCategoryData: null,
    bannerCategoryLoading: false,
    bannerCategoryerror: null
}

export default function categoryBannerReducer(state = initialState, action) {

    switch(action.type) {
        case BANNER_CATEGORIES_LOADING:
            return {
                ...state,
                bannerCategoryLoading: true,
                    bannerCategoryData: null,
                    bannerCategoryerror: null
            }
        case BANNER_CATEGORIES_SUCCESS:
            return {
                ...state,
                bannerCategoryLoading: false,
                bannerCategoryData: action.data
            }
        case BANNER_CATEGORIES_FAILURE:
            return {
                ...state,
                bannerCategoryLoading: false,
                bannerCategoryerror: action.data
            }
        default:
            return state
    }
}