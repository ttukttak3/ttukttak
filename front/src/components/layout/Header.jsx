/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './Header.style';
import keyboard_arrow_left from '../../assets/img/arrows/Keyboard_arrow_left.png';
import expand_more from '../../assets/img/arrows/expand_more.png';
import Search from '../../assets/img/userInterFace/Search.png';
import Favorite_border from '../../assets/img/userInterFace/Favorite_border.png';
import Notifications from '../../assets/img/userInterFace/Notifications.png';
//import Notifications_On from '../../assets/img/userInterFace/Notifications_On.png';
import Trash_Can from '../../assets/img/userInterFace/Trash_Can.png';
import { useEffect } from 'react';

const Header = () => {
  const { HeaderBox, LeftBox, Title, BackBtn, DownBtn, RightBox, RightBtn } = style;
  const navigate = useNavigate();
  const header = useSelector(state => state.header);
  const { title, back, backHome, location, search, favorite, alert, trash } = header;
  //처음 스크롤 값은 0으로 false 초기 값 세팅
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    //scrollY > 30을 기준으로 state 변경
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 30) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= 30) {
        setScrolled(false);
      }
    };
    //스크롤 이벤트 시 handleScroll 동작
    window.addEventListener('scroll', handleScroll);
    return () => {
      //cleanup
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  return (
    <HeaderBox className={scrolled ? 'fixHeader' : ''}>
      <LeftBox>
        {back && (
          <BackBtn onClick={() => navigate(-1)}>
            <img src={keyboard_arrow_left} alt={'뒤로가기'} />
          </BackBtn>
        )}
        {backHome && (
          <BackBtn onClick={() => navigate(`/`)}>
            <img src={keyboard_arrow_left} alt={'홈'} />
          </BackBtn>
        )}
        <Title>{title}</Title>
        {location && (
          <DownBtn>
            <img src={expand_more} alt={'위치목록'} />
          </DownBtn>
        )}
      </LeftBox>
      <RightBox>
        {search && (
          <RightBtn>
            <img src={Search} alt={'검색버튼'} />
          </RightBtn>
        )}
        {favorite && (
          <RightBtn>
            <img src={Favorite_border} alt={'북마크버튼'} />
          </RightBtn>
        )}
        {trash && (
          <RightBtn>
            <img src={Trash_Can} alt={'삭제버튼'} />
          </RightBtn>
        )}
        {alert && (
          <RightBtn onClick={() => navigate(`/chat/alert`)}>
            <img src={Notifications} alt={'알림목록'} />
          </RightBtn>
        )}
      </RightBox>
    </HeaderBox>
  );
};

export default Header;
