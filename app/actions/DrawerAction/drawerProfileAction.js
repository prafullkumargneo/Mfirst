import { DRAWER_PROFILE_SUCCESS, DRAWER_PROFILE_FAILURE, DRAWER_PROFILE_LOADING } from '../api/types';


export default function drawerProfile(res) {
console.log("response in drawer",res)
    return (dispatch) => {
        dispatch(drawerProfileLoading())
        // if (res && res.Data) {
            dispatch(drawerProfileSuccess(res.Data?res.Data:res.data));
        // } else {
        //     dispatch(drawerProfileFailure(res))
        // }
    }

}

function drawerProfileLoading() {

    return {
        type: DRAWER_PROFILE_LOADING
    }
}

function drawerProfileSuccess(data) {

    return {
        type: DRAWER_PROFILE_SUCCESS,
        data
    }
}

function drawerProfileFailure(data) {
    return {
        type: DRAWER_PROFILE_FAILURE,
        data
    }
}