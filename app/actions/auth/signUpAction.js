import AsyncStorage from '@react-native-community/async-storage';
import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';
import drawerProfile from '../DrawerAction/drawerProfileAction';
import NavService from '../../containers/navigators/navigationService';
import { RNToasty } from 'react-native-toasty';

export default function signUp(signUpData) {
    console.log("signupdata", signUpData)
    let method = 'POST'
    // let api = 'login=' + signUpData.login + '&password=' + signUpData.password + '&confirm_password=' + signUpData.confirmpassword + '&name=' + signUpData.name;
    return (dispatch) => {
        dispatch(signUpLoading())
        return ApiCaller(ApiConstants.SIGNUP, method, signUpData).then(res => {
            if (res && res.data) {
                AsyncStorage.setItem('LoggedInData', JSON.stringify(res.data));
                dispatch(signUpSuccess(res.data));
                dispatch(drawerProfile(res))
                RNToasty.Success({
                    title: "You have succcessfully registered.",
                    titleSize: 15
                })

                NavService.navigate('root', 'MainDrawer');
            } else {
                dispatch(signUpFailure(res))
            }
            console.log("response of signup api", res)
        })
    }
}

function signUpLoading() {

    return {
        type: SIGN_UP_LOADING
    }
}

function signUpSuccess(data) {

    return {
        type: SIGN_UP_SUCCESS,
        data
    }
}

function signUpFailure(data) {
    return {
        type: SIGN_UP_FAILURE,
        data
    }
}