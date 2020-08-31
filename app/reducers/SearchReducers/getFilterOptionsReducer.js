import { GET_FILTER_OPTION_SUCCESS, GET_FILTER_OPTION_FAILURE,GET_FILTER_OPTION_LOADING } from '../../actions/api/types';

const initialState = {
    getFilterOptionData: null,
    getFilterOptionLoading: false,
    getFilterOptionError: null
}



export default function getFilterOptionReducer(state = initialState, action) {

    switch (action.type) {
        case GET_FILTER_OPTION_LOADING:
            return {
                ...state,
                getFilterOptionLoading: true,
                getFilterOptionData: null,
                getFilterOptionError: null
            }
        case GET_FILTER_OPTION_SUCCESS:
            return {
                ...state,
                getFilterOptionLoading: false,
                getFilterOptionData: action.data
            }
        case GET_FILTER_OPTION_FAILURE:
            return {
                ...state,
                getFilterOptionLoading: false,
                getFilterOptionError: action.data
            }
        default:
            return state
    }
}