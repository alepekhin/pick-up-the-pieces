import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import LocationSaga from './locations/LocationSaga'
import oidcReducer from './OidcSlice';
import locationReducer from './locations/LocationSlice'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  oidc:oidcReducer,
  location: locationReducer
})

const globalStore = configureStore({
    reducer:rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(LocationSaga)

export default globalStore

