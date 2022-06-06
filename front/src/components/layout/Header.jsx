import React from 'react';
import style from './Header.style';

const Header = () => {
  const { HeaderBox } = style;
  return (
    <HeaderBox>
      <h2>여기는 헤더</h2>
    </HeaderBox>
  );
};

export default Header;
