import React from 'react';
import style from './BookDetailPage.style';
const LenderInfoPage = () => {
  const { LenderWrap, LenderInfo, Counting } = style;
  return (
    <LenderWrap>
      <LenderInfo>
        <img src="" alt="" />
        <div>
          <h2>김민정</h2>
          <p>수원시 권선구 고색동</p>
        </div>
      </LenderInfo>
      <Counting>
        <dt>빌려준 횟수</dt>
        <dd>1회</dd>
        <dt>빌린 횟수</dt>
        <dd>2회</dd>
      </Counting>
    </LenderWrap>
  );
};

export default LenderInfoPage;
