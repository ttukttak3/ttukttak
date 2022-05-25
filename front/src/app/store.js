import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../pages/Login/loginSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
  },
});
