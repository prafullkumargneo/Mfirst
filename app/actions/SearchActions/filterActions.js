import { FILTER_DATA_SUCCESS, FILTER_DATA_FAILURE,FILTER_DATA_LOADING } from '../api/types';
import ApiCaller from '../api/CustomApiCaller';
import ApiConstants from '../api/ApiConstants';


export default function filterData(filterData) {
console.log("filterData",filterData)
let method='POST'
  return (dispatch) => {
    dispatch(filterDataLoading())
    return ApiCaller(ApiConstants.FILTER,method,filterData).then(res => {
      if (res && res.data ) {
        dispatch(filterDataSuccess(res.data));
      
      } else {
        dispatch(filterDataFailure(res))
      }
      console.log("response of discover filter api caller", res)
    })

  }

}

function filterDataLoading() {

  return {
    type: FILTER_DATA_LOADING
  }
}

function filterDataSuccess(data) {

  return {
    type: FILTER_DATA_SUCCESS,
    data
  }
}

function filterDataFailure(data) {
  return {
    type: FILTER_DATA_FAILURE,
    data
  }
}