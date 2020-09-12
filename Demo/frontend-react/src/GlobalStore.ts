import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import oidcReducer from './OidcSlice';
import locationReducer from './locations/LocationSlice'
import LocationSaga from './locations/LocationSaga'
import deviceReducer from './devices/DeviceSlice'
import DeviceSaga from './devices/DeviceSaga'
import associationReducer from './associations/AssociationSlice'
import AssociationSaga from './associations/AssociationSaga'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  oidc:oidcReducer,
  location: locationReducer,
  device: deviceReducer,
  association: associationReducer
})

const globalStore = configureStore({
    reducer:rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(LocationSaga)
sagaMiddleware.run(DeviceSaga)
sagaMiddleware.run(AssociationSaga)

export default globalStore

