import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import headerSlice from './headerSlice';
import userSlice from './userSlice';

const reducers = combineReducers({
  header: headerSlice,
  user: userSlice,
});

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // header, user, 2개의 reducer 중에 user reducer만 localstorage에 저장합니다.
  whitelist: ['user'],
  // blacklist -> 그것만 제외합니다
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
