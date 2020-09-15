import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import oidcReducer from './oidc/OidcSlice';
import locationReducer from './locations/LocationSlice'
import LocationSaga from './locations/LocationSaga'
import deviceReducer from './devices/DeviceSlice'
import DeviceSaga from './devices/DeviceSaga'
import associationReducer from './associations/AssociationSlice'
import AssociationSaga from './associations/AssociationSaga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  oidc:oidcReducer,
  location: locationReducer,
  device: deviceReducer,
  association: associationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const globalStore = configureStore({
    reducer:persistedReducer,
    middleware: [...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }), sagaMiddleware]
});

sagaMiddleware.run(LocationSaga)
sagaMiddleware.run(DeviceSaga)
sagaMiddleware.run(AssociationSaga)

let persistor = persistStore(globalStore)

export { globalStore, persistor }

