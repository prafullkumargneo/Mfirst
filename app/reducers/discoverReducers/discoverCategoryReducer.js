import { DISCOVER_CATEGORY_SUCCESS,DISCOVER_CATEGORY_FAILURE, DISCOVER_CATEGORY_LOADING } from  '../../actions/api/types';

const initialState = {
    discoverCategoryData: null,
    discoverCategoryLoading: false,
    discoverCategoryError: null
}

export default function discoverCategoryReducer(state = initialState, action) {
    switch(action.type) {
        case DISCOVER_CATEGORY_LOADING:
            return {
                ...state,
                discoverCategoryLoading: true
            }
        case DISCOVER_CATEGORY_SUCCESS:
            return {
                ...state,
                discoverCategoryLoading: false,
                discoverCategoryData: action.data,
                discoverCategoryError:null
            }
        case DISCOVER_CATEGORY_FAILURE:
            return {
                ...state,
                discoverCategoryLoading: false,
                discoverCategoryError: action.data,
                discoverCategoryData:null
            }
        default:
            return state
    }
}