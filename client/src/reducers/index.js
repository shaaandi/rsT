import {combineReducers} from 'redux';
import authReducer from './authReducer';
import retailerReducer from './retailerReducer';
import customerReducer from './customerReducer';
import productReducer from './productReducer';
import flashReducer from './flashReducer';
import serviceReducer from './serviceReducer';
import searchReducer from './searchReducer';
export default combineReducers({
    auth : authReducer,
    retailer : retailerReducer,
    customer : customerReducer,
    products : productReducer,
    flash : flashReducer,
    service : serviceReducer,
    search : searchReducer
});