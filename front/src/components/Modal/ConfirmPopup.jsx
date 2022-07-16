import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import style from './ConfirmPopup.style';

const ConfirmPopup = ({ contents }) => {
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

  const { Wrap, PopupBox, ContBox, ButtonBox } = style;
  return createPortal(
    <Wrap>
      <PopupBox>
        <ContBox>{contents}</ContBox>
        <ButtonBox>
          <button>취소</button>
          <button>확인</button>
        </ButtonBox>
      </PopupBox>
    </Wrap>,
    document.getElementById('modal'),
  );
};

export default ConfirmPopup;
