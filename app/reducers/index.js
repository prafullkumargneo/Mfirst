import { combineReducers } from 'redux';
import categoryReducer from './CategoryReducers/CategoryReducer';
import subcategoryReducer from './CategoryReducers/subCategoryReducer';
import signInReducer from './authReducers/signInReducer';

const rootReducer = combineReducers({
    categoryReducer,
    subcategoryReducer,
    signInReducer
})

export default rootReducer