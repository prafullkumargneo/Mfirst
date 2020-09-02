import { FILTER_DATA_SUCCESS, FILTER_DATA_FAILURE,FILTER_DATA_LOADING } from '../../actions/api/types';

const initialState = {
    filterData: null,
    filterLoading: false,
    filterError: null
}



export default function filterReducer(state = initialState, action) {

    switch (action.type) {
        case FILTER_DATA_LOADING:
            return {
                ...state,
                filterLoading: true,
                filterData: null,
                filterError: null
            }
        case FILTER_DATA_SUCCESS:
            return {
                ...state,
                filterLoading: false,
                filterData: action.data,
                filterError:null
            }
        case FILTER_DATA_FAILURE:
            return {
                ...state,
                filterLoading: false,
                filterError: action.data,
                filterData:null
            }
        default:
            return state
    }
}