import { createSlice } from '@reduxjs/toolkit';

export const urlSlice = createSlice({
  name: 'url',
  initialState: {
    data: '/',
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = urlSlice.actions;

export default urlSlice.reducer;
