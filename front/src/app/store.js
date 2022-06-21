import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './headerSlice';
import urlSlice from './urlSlice';
import loginReducer from '../pages/Login/loginSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    header: headerSlice,
    url: urlSlice,
    user: userSlice,
  },
});
