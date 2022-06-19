import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBack, setBackHome, setTitle, setLocation, setSearch, setTrash, setFavorite, setAlert } from '../../app/headerSlice';
import style from './HomePage.style';
const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBack(false));
    dispatch(setBackHome(false));
    dispatch(setTitle('우리집'));
    dispatch(setLocation(true));
    dispatch(setSearch(true));
    dispatch(setTrash(false));
    dispatch(setFavorite(true));
    dispatch(setAlert(true));
    return () => {
      // second;
    };
  }, [dispatch]);
  const { HomeWrap, TitleBox, BookBox, PlusBtn } = style;
  return (
    <HomeWrap>
      <TitleBox>
        <h2>대여가능</h2>
        <select>
          <option>최신순</option>
        </select>
        <select>
          <option>카테고리</option>
        </select>
      </TitleBox>
      <BookBox>list</BookBox>
      <PlusBtn />
    </HomeWrap>
  );
};

export default HomePage;
