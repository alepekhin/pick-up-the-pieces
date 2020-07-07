import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import todoReducer from './features/todo/todos/todoSlice';
import visibilityFilterReducer from './features/todo/filter/filterSlice';
import helloSaga from './features/todo/todos/sagas';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  todos:todoReducer,
  visibilityFilter: visibilityFilterReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(helloSaga);

let persistor = persistStore(store)

export { store, persistor }

