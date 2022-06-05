import React from 'react';
import style from './Footer.style';
// import { Link } from 'react-router-dom';
import home from '../../assets/img/userInterFace/Home.png';
import library from '../../assets/img/userInterFace/Library_books.png';
import book from '../../assets/img/userInterFace/Book.png';
import chat from '../../assets/img/userInterFace/Chat_bubble_outline.png';
import account from '../../assets/img/userInterFace/Account_circle.png';
const Footer = () => {
  const { FooterBox, IconBox } = style;
  //여기에 리듀서를 달아보자!
  return (
    <FooterBox>
      <IconBox href="">
        <img src={home} alt="home" />홈
      </IconBox>
      <IconBox href="">
        <img src={library} alt="library" />
        인사이트
      </IconBox>
      <IconBox href="">
        <img src={book} alt="book" />
        대여관리
      </IconBox>
      <IconBox href="">
        <img src={chat} alt="chat" />
        채팅
      </IconBox>
      <IconBox href="">
        <img src={account} alt="account" />
        나의책방
      </IconBox>
    </FooterBox>
  );
};

export default Footer;
