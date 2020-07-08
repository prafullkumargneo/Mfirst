import { combineReducers } from 'redux';
import categoryReducer from './CategoryReducers/CategoryReducer';
import subcategoryReducer from './CategoryReducers/subCategoryReducer';
import signInReducer from './authReducers/signInReducer';
import signUpReducer from './authReducers/signUpReducer';
import categoryBannerReducer from './CategoryReducers/categoryBannerReducer';
import productDetailReducer from './ProductReducers/productDetailsReducer';
import getCartProductReducer from './cartReducers/getCartProductReducers';
import addToCartReducer from './cartReducers/addToCartReducers';
import drawerProfileReducer from './drawerReducers/drawerProfileReducer';
import shippingAddressReducer from './ShippingAddressReducers/ShippingAddressReducer';
import addshippingAddressReducer from './ShippingAddressReducers/addShippingAddressReducers';
 
const rootReducer = combineReducers({
    categoryReducer,
    subcategoryReducer,
    signInReducer,
    signUpReducer,
    categoryBannerReducer,
    productDetailReducer,
    getCartProductReducer,
    addToCartReducer,
    drawerProfileReducer,
    shippingAddressReducer,
    addshippingAddressReducer
})

export default rootReducer