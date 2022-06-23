import { createPortal } from 'react-dom';
import React from 'react';
import style from './SelectPopupBottom.style';

const SelectPopupBottom = ({ message }) => {
  const { Wrap, PopupBox } = style;
  return createPortal(
    <Wrap>
      <PopupBox>
        <p>{message}</p>
      </PopupBox>
    </Wrap>,
    document.getElementById('modal'),
  );
};

export default SelectPopupBottom;
