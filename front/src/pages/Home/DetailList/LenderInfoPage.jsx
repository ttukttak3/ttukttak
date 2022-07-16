import React from 'react';
import style from './BookDetailPage.style';
import noImg from '../../../assets/img/logo/no_img.png';
const LenderInfoPage = content => {
  console.log(content);
  const onErrorImg = e => {
    e.target.src = noImg;
  };
  const { LenderWrap, LenderInfo, Counting } = style;
  return (
    <LenderWrap>
      <LenderInfo>
        <img src="/" onError={onErrorImg} alt="이미지" />
        <div>
          <h2>{/*{content.nickName}*/}</h2>
          <p>수원시 권선구 고색동</p>
        </div>
      </LenderInfo>
      <Counting>
        <dt>빌려준 횟수</dt>
        <dd>1회</dd>
      </Counting>
      <Counting>
        <dt>빌린 횟수</dt>
        <dd>2회</dd>
      </Counting>
    </LenderWrap>
  );
};

export default LenderInfoPage;
