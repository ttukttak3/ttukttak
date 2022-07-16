/* eslint-disable max-lines-per-function */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './Footer.style';
import home from '../../assets/img/userInterFace/Home.png';
import homeOff from '../../assets/img/userInterFace/Home_off.png';
// import library from '../../assets/img/userInterFace/Library_books.png';
// import libraryOff from '../../assets/img/userInterFace/Library_books_off.png';
import book from '../../assets/img/userInterFace/Book.png';
import bookOff from '../../assets/img/userInterFace/Book_off.png';
import chat from '../../assets/img/userInterFace/Chat_bubble_outline.png';
import chatOff from '../../assets/img/userInterFace/Chat_bubble_outline_off.png';
import account from '../../assets/img/userInterFace/Account_circle.png';
import accountOff from '../../assets/img/userInterFace/Account_circle_off.png';

const Footer = () => {
  const navigate = useNavigate();

  // store 의 상태가 바뀔 때마다 상태를 받아온다.
  // const url = useSelector(state => state.url);
  const location = useLocation();
  const { pathname } = location;
  const { FooterBox, IconBox } = style;

  return (
    <FooterBox className={pathname === '/detailBook' ? 'hide' : 'show'}>
      <IconBox onClick={() => navigate(`/`)}>
        <img src={pathname !== '/' ? homeOff : home} alt="home" />홈
      </IconBox>
      <IconBox onClick={() => navigate(`/book`)}>
        <img src={pathname !== '/book' ? bookOff : book} alt="book" />
        대여관리
      </IconBox>
      <IconBox onClick={() => navigate(`/chat`)}>
        <img src={pathname !== '/chat' ? chatOff : chat} alt="chat" />
        채팅
      </IconBox>
      <IconBox onClick={() => navigate(`/account`)}>
        <img src={pathname !== '/account' ? accountOff : account} alt="account" />
        나의책방
      </IconBox>
    </FooterBox>
  );
};

export default Footer;
