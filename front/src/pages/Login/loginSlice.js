import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    id: '',
    name: '',
    phone: '',
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const { setId, setName, setPhone } = loginSlice.actions;

export default loginSlice.reducer;
