import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import oidcReducer from './OidcSlice';

const rootReducer = combineReducers({
  oidc:oidcReducer
})

const globalStore = configureStore({
    reducer:rootReducer
});

export default globalStore

