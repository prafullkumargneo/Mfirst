import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_IN_LOADING } from '../../actions/api/types';

const initialState = {
    signInData: null,
    signinLoading: false,
    signinError: null
}

export default function signInReducer(state = initialState, action) {
console.log("action in signin",action.type,action.data)
    switch(action.type) {
        case SIGN_IN_LOADING:
            return {
                ...state,
                signinLoading: true
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                signinLoading: false,
                signInData: action.data
            }
        case SIGN_IN_FAILURE:
            return {
                ...state,
                signinLoading: false,
                signinError: action.data
            }
        default:
            return state
    }
}