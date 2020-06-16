import { FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, FETCHING_TODOS } from './api/types';
import ApiCaller from './api/CustomApiCaller';
import ApiConstants from './api/ApiConstants';

export default function fetchToDos() {
  return (dispatch) => {
    console.log("in function")
    dispatch(getTodos())
     return ApiCaller(ApiConstants.LOGIN).then(res => {
      if (res && res.data) {
        dispatch(getToDosSuccess(res));
      } else {
         dispatch(getToDosSuccess(res))
      }
      console.log("response of custom api caller", res)
    })
    // return (fetch('http://180.149.241.208:3037/Lists/mobiles'))
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log("custom api caller", json)
    //     return (dispatch(getToDosSuccess(json)))
    //   })
    //   .catch(err => dispatch(getToDosFailure(err)))
  }
}

function getTodos() {

  return {
    type: FETCHING_TODOS
  }
}

function getToDosSuccess(data) {

  return {
    type: FETCH_TODOS_SUCCESS,
    data
  }
}

function getToDosFailure() {
  return {
    type: FETCH_TODOS_FAILURE
  }
}