import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './headerSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    header: headerSlice,
    user: userSlice,
  },
});
