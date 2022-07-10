import React from 'react';
import style from './BookDetailPage.style';
const OtherLendersPage = () => {
  const { OtherWrap } = style;
  return (
    <OtherWrap>
      <h2>이 책을 가진 다른 대여자</h2>
      <dl>
        <dt>대여가능</dt>
        <dd>
          <div>
            <h6>
              서초구 서초동 <span>1km</span>
            </h6>
            <p>
              대여료 <span>2,000원</span>
            </p>
            <p>
              보증금 <span>15,000원</span>
            </p>
          </div>
          <div>A</div>
        </dd>
      </dl>
    </OtherWrap>
  );
};

export default OtherLendersPage;
