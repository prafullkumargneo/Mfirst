import { combineReducers } from 'redux';
import categoryReducer from './CategoryReducers/CategoryReducer';
import subcategoryReducer from './CategoryReducers/subCategoryReducer';
import signInReducer from './authReducers/signInReducer';
import signUpReducer from './authReducers/signUpReducer';
import categoryBannerReducer from './CategoryReducers/categoryBannerReducer';
import productDetailReducer from './ProductReducers/productDetailsReducer';

const rootReducer = combineReducers({
    categoryReducer,
    subcategoryReducer,
    signInReducer,
    signUpReducer,
    categoryBannerReducer,
    productDetailReducer
})

export default rootReducer