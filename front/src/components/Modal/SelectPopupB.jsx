import { createPortal } from 'react-dom';
import React from 'react';
import style from './SelectPopupB.style';

const SelectPopupB = ({ message }) => {
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

export default SelectPopupB;
