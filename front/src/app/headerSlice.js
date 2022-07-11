/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        title: '우리집',
        back: false,
        backHome: false, //소셜 로그인 후 프로필 창에서 Back시 홈으로 이동(로그인 화면으로 보내면 로그인에서 백 시 다시 프로필로 오기 때문에 홈으로 이동한다.)
        location: false, //아래버튼
        search: false,
        favorite: false,
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
        setBackHome: (state, action) => {
            state.backHome = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setFavorite: (state, action) => {
            state.favorite = action.payload;
        },
        setAlert: (state, action) => {
            state.alert = action.payload;
        },
        setTrash: (state, action) => {
            state.trash = action.payload;
        },
        setAllFalse: (state, action) => {
            Object.keys(state).forEach(key => {
                if (state[key]) {
                    state[key] = false;
                }
            })
        }
    },
});

export const { setTitle, setBack, setBackHome, setLocation, setSearch, setFavorite, setAlert, setTrash, setSave, setAllFalse } = headerSlice.actions;

export default headerSlice.reducer;
