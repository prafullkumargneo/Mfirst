import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import app from "../reducers";


//create store
 const store = createStore(app,applyMiddleware(thunk, logger,apiMiddleware));


export default store;
