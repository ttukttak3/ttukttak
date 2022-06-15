import { createSlice } from '@reduxjs/toolkit';

export const urlSlice = createSlice({
  name: 'url',
  initialState: {
    type: '',
    data: '/',
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setType, setData } = urlSlice.actions;

export default urlSlice.reducer;
