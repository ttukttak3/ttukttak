/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    role: '',
    nickName: '',
    email: '',
    imageFile: '',
    homeTown: '',
    introduction: '',
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setNickName: (state, action) => {
      state.nickName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setImageFile: (state, action) => {
      state.imageFile = action.payload;
    },
    setHomeTown: (state, action) => {
      state.homeTown = action.payload;
    },
    setIntroduction: (state, action) => {
      state.introduction = action.payload;
    },
    setClear: (state, action) => {
      Object.keys(state).forEach(key => {
        if (state[key]) {
          state[key] = '';
        }
      });
    },
  },
});

export const { setUserId, setRole, setNickName, setEmail, setImageFile, setHomeTown, setIntroduction, setClear } = userSlice.actions;

export default userSlice.reducer;
