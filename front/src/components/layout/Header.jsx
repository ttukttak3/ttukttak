import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './Header.style';
import keyboard_arrow_left from '../../assets/img/arrows/Keyboard_arrow_left.png';

const Header = () => {
  const { HeaderBox, Title, BackBtn } = style;
  const navigate = useNavigate();
  const header = useSelector(state => state.header);
  const { title, back, location, alert, trash } = header;
  return (
    <HeaderBox>
      {back && <BackBtn src={keyboard_arrow_left} alt={'뒤로가기'} onClick={() => navigate(-1)} />}
      <Title>{title}</Title>
    </HeaderBox>
  );
};

export default Header;
