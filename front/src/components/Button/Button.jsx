import React from 'react';
import style from './Button.style';
//아직 기본만 잡고 right icon 미작업
const Button = ({ children, type }) => {
  const { StyledButton } = style;
  return <StyledButton type={type}>{children}</StyledButton>;
};

export default Button;
