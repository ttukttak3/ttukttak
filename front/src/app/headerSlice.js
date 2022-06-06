/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        title: '우리 집',
        back: true,
        location: false,
        alert: false,
        trash: false,
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setBack: (state, action) => {
            state.back = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setAlert: (state, action) => {
            state.alert = action.payload;
        },
        setTrash: (state, action) => {
            state.trash = action.payload;
        },
    },
});

export const { setTitle, setBack, setLocation, setAlert, setTrash } = headerSlice.actions;

export default headerSlice.reducer;
