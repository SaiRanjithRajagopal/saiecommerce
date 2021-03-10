import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productsReducer, productDetailsReducer } from '../Redux_Thunk/Reducers/ProductReducers'
import { authenticationReducer, createUser_Reducer, forgotPassword_Reducer, updatePassword_Reducer } from '../Redux_Thunk/Reducers/UserReducer'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    userAuthentication: authenticationReducer,
    newUser: createUser_Reducer,
    forgotPassword: forgotPassword_Reducer,
    updatePassword: updatePassword_Reducer
});

let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
