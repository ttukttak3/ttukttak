import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import style from './SelectPopupBottom.style';

const SelectPopupBottom = ({ title, contents }) => {
  useEffect(() => {
    //팝업 뒤 스크롤 막기
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

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
