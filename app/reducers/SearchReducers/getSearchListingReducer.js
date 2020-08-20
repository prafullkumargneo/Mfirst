import { GET_SEARCH_LIST_SUCCESS, GET_SEARCH_LIST_FAILURE, GET_SEARCH_LIST_LOADING } from '../../actions/api/types';

const initialState = {
    getSearchListData: null,
    getSearchListLoading: false,
    getSearchListError: null
}



export default function getSearchListReducer(state = initialState, action) {

    switch (action.type) {
        case GET_SEARCH_LIST_LOADING:
            return {
                ...state,
                getSearchListLoading: true,
                getSearchListData: null,
                getSearchListError: null
            }
        case GET_SEARCH_LIST_SUCCESS:
            return {
                ...state,
                getSearchListLoading: false,
                getSearchListData: action.data
            }
        case GET_SEARCH_LIST_FAILURE:
            return {
                ...state,
                getSearchListLoading: false,
                getSearchListError: action.data
            }
        default:
            return state
    }
}