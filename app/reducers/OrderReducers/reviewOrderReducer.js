import {  GET_REVIEW_ORDER_SUCCESS, GET_REVIEW_ORDER_FAILURE, GET_REVIEW_ORDER_LOADING } from '../../actions/api/types';

const initialState = {
    getReviewOrderData: null,
    getReviewOrderLoading: false,
    getReviewOrderError: null
}

export default function reviewOrderReducer(state = initialState, action) {

    switch(action.type) {
        case GET_REVIEW_ORDER_LOADING:
            return {
                ...state,
                getReviewOrderLoading: true,
                getReviewOrderData: null,
                getReviewOrderError: null
            }
        case GET_REVIEW_ORDER_SUCCESS:
            return {
                ...state,
                getReviewOrderLoading: false,
                getReviewOrderData: action.data,
                getReviewOrderError:null
            }
        case GET_REVIEW_ORDER_FAILURE:
            return {
                ...state,
                getReviewOrderLoading: false,
                getReviewOrderError: action.data,
                getReviewOrderData:null
            }
        default:
            return state
    }
}