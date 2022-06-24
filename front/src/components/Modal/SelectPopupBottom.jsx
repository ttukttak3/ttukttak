import { createPortal } from 'react-dom';
import React from 'react';
import style from './SelectPopupBottom.style';

const SelectPopupBottom = ({ title, onClick, onClick1, onClick2, message1, message2, message3 }) => {
  const { Wrap, PopupBox, PopupTitle, PopupContent } = style;
  return createPortal(
    <Wrap>
      <PopupBox>
        <PopupTitle>{title}</PopupTitle>
        <PopupContent onClick={onClick}>{message1}</PopupContent>
        <PopupContent onClick={onClick1}>{message2}</PopupContent>
        <PopupContent onClick={onClick2}>{message3}</PopupContent>
      </PopupBox>
    </Wrap>,
    document.getElementById('modal'),
  );
};

export default SelectPopupBottom;
