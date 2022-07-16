import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './headerSlice';
import urlSlice from './urlSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    header: headerSlice,
    url: urlSlice,
    user: userSlice,
  },
});
