import { createPortal } from 'react-dom';
import React from 'react';
import style from './SelectPopupBottom.style';

const SelectPopupBottom = ({ title, contents }) => {
  const { Wrap, PopupBox, PopupTitle, PopupContentWrap, PopupContent } = style;
  return createPortal(
    <Wrap>
      <PopupBox>
        <PopupTitle>{title}</PopupTitle>
        <PopupContentWrap>
          {contents.map((item, idx) => (
            <PopupContent key={idx} onClick={item.onClick}>
              {item.message}
            </PopupContent>
          ))}
        </PopupContentWrap>
      </PopupBox>
    </Wrap>,
    document.getElementById('modal'),
  );
};

export default SelectPopupBottom;
