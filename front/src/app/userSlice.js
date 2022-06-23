/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        nickName: '',
        email: '',
        imageFile: '',
        imagePreview: '',
    },
    reducers: {
        setNickName: (state, action) => {
            state.nickName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setImageFile: (state, action) => {
            state.imageFile = action.payload;
        },
        setImagePreview: (state, action) => {
            state.imagePreview = action.payload;
        },
    },
});

export const { setNickName, setEmail, setImageFile, setImagePreview } = userSlice.actions;

export default userSlice.reducer;
