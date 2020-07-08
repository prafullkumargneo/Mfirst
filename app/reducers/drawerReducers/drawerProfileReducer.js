import { DRAWER_PROFILE_SUCCESS, DRAWER_PROFILE_FAILURE, DRAWER_PROFILE_LOADING } from '../../actions/api/types';

const initialState = {
    drawerProfileData:null,
    drawerProfileLoading: false,
    drawerProfileError: false
}

export default function  drawerProfileReducer(state = initialState, action) {
console.log("reducer of drawer",action)
    switch(action.type) {
        case DRAWER_PROFILE_LOADING:
            return {
                ...state,
                drawerProfileLoading: true
            }
        case DRAWER_PROFILE_SUCCESS:
            return {
                ...state,
                drawerProfileLoading: false,
                drawerProfileData: action.data
            }
        case DRAWER_PROFILE_FAILURE:
            return {
                ...state,
                drawerProfileLoading: false,
                drawerProfileError: true
            }
        default:
            return state
    }
}