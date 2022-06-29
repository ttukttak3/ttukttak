import { createPortal } from 'react-dom';
import React from 'react';
import style from './SelectPopupBottom.style';

const SelectPopupBottom = ({ title, contents }) => {

  const { Wrap, PopupBox, PopupTitle, PopupContent } = style;
  return createPortal(
    <Wrap>
      <PopupBox>
        <PopupTitle>{title}</PopupTitle>
        {contents.map((item, idx) => (
          <PopupContent key={idx} onClick={item.onClick}>
            {item.message}
          </PopupContent>
        ))}
      </PopupBox>
    </Wrap>,
    document.getElementById('modal'),
  );
};

export default SelectPopupBottom;
