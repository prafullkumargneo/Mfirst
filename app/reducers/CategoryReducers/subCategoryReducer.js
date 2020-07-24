import { SUB_CATEGORIES_SUCCESS, SUB_CATEGORIES_FAILURE,SUB_CATEGORIES_LOADING} from '../../actions/api/types';

const initialState = {
    subcategoriesData: null,
    issubcategoryLoading: false,
    subcategoryError: null
}

export default function subcategoryReducer(state = initialState, action) {
    switch(action.type) {
        case SUB_CATEGORIES_LOADING:
            return {
                ...state,
                issubcategoryLoading: true
            }
        case SUB_CATEGORIES_SUCCESS:
            return {
                ...state,
                issubcategoryLoading: false,
                subcategoriesData: action.data,
                subcategoryError:null
            }
        case SUB_CATEGORIES_FAILURE:
            return {
                ...state,
                issubcategoryLoading: false,
                subcategoryError: action.data,
                subcategoriesData: null
            }
        default:
            return state
    }
}