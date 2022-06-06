import { configureStore } from '@reduxjs/toolkit';
import headerSlice from '../components/layout/headerSlice';
import loginReducer from '../pages/Login/loginSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    header: headerSlice,
    // url: urlReducer,
  },
});
