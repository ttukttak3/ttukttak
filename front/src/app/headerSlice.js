/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        title: '',
        back: false,        //뒤로가기
        backHome: false,    //소셜 로그인 후 프로필 창에서 Back시 홈으로 이동
        location: false,    //위치(아래모양)
        search: false,      //검색
        favorite: false,    //북마크
        alert: false,       //확인
        trash: false,       //쓰레기
        share: false,       //공유하기
        more: false,        //더보기
        moreBookId: 0,      //더보기 팝업 클릭 시 컨트롤할 책 ID값
        save: false,        //도서 등록 버튼 
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
        setShare: (state, action) => {
            state.share = action.payload;
        },
        setMore: (state, action) => {
            state.more = action.payload;
        },
        setMoreBookId: (state, action) => {
            state.moreBookId = action.payload;
        },
        setSave: (state, action) => {
            state.save = action.payload;
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

export const { setTitle, setBack, setBackHome, setLocation, setSearch, setFavorite, setAlert, setTrash, setShare, setMore, setMoreBookId, setSave, setAllFalse } = headerSlice.actions;

export default headerSlice.reducer;
