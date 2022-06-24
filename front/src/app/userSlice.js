/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        role: '',
        nickName: '',
        email: '',
        imageFile: '',
        homeTown:'',
    },
    reducers: {
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
    },
});

export const { setRole, setNickName, setEmail, setImageFile, setHomeTown } = userSlice.actions;

export default userSlice.reducer;
