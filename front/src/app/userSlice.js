/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: 0
    },
    reducers: {
        setUserId: (state, action) => {
            state.type = action.payload;
        },
    },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
