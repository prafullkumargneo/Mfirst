import {  SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_LOADING  } from '../../actions/api/types';

const initialState = {
    signUpData: null,
    signUpLoading: false,
    signUpError: null
}

export default function signUpReducer(state = initialState, action) {
console.log("action in signin",action.type,action.data)
    switch(action.type) {
        case SIGN_UP_LOADING:
            return {
                ...state,
                signUpLoading: true
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpLoading: false,
                signUpData: action.data
            }
        case SIGN_UP_FAILURE:
            return {
                ...state,
                signUpLoading: false,
                signUpError: action.data
            }
        default:
            return state
    }
}