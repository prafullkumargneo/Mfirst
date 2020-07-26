import { GET_CATEGORIES_SUCCESS,GET_CATEGORIES_FAILURE,GET_CATEGORIES_LOADING } from '../../actions/api/types';

const initialState = {
    categoriesData: null,
    isFetching: false,
    error: false
}

export default function categoryReducer(state = initialState, action) {

    switch(action.type) {
        case GET_CATEGORIES_LOADING:
            return {
                ...state,
                isFetching: true
            }
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                categoriesData: action.data,
                error:false
            }
        case GET_CATEGORIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                categoriesData:null
            }
        default:
            return state
    }
}