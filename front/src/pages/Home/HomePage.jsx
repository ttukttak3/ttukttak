/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBack, setBackHome, setTitle, setLocation, setSearch, setTrash, setFavorite, setAlert } from '../../app/headerSlice';
import { useNavigate } from 'react-router-dom';
import style from './HomePage.style';
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const onLoanOn = () => {
    navigate(`/onLoan`);
  };

  const { HomeWrap, TitleBox, BookWrap, BookBox, BookTitle, BookLocation, BookPrice, BookState, PlusBtn } = style;
  return (
    <HomeWrap>
      <TitleBox>
        <h2 onClick={onLoanOn}>대여가능</h2>
        <select>
          <option>최신순</option>
        </select>
        <select>
          <option>카테고리</option>
        </select>
      </TitleBox>
      {/* <BookWrap>우리 동네 첫 책을 등록해보세요.</BookWrap> */}
      <BookWrap>
        <BookBox>
          <dt>북</dt>
          <dd>
            <BookTitle>
              <h4>불편한 편의점에 오신 걸 어쩌고 라라라</h4>
              <span>베르나르 베르베르</span>
            </BookTitle>
            <BookLocation>
              <span className="blue">대여가능</span>
              서초구 방배동
            </BookLocation>
            <BookPrice>
              <div>
                <span>대여료</span>
                <p>2,000원</p>
              </div>
              <div>
                <span>보증금</span>
                <p>15,000원</p>
              </div>
            </BookPrice>
            <BookState>
              <p className="bookmark">0</p>
              <p className="loanCount">0</p>
            </BookState>
          </dd>
        </BookBox>
      </BookWrap>
      <PlusBtn />
    </HomeWrap>
  );
};

export default HomePage;
