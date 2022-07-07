import React from 'react';
import style from './HomePage.style';
const BookOnLoadPage = ({ range, category }) => {
  const { BookWrap, BookBox, BookTitle, BookLocation, BookPrice, BookState } = style;
  return (
    <BookWrap>
      {/* 대여중/예약중 책이 없습니다. */}
      <BookBox>
        <dt>
          <button>A</button>
        </dt>
        <dd>
          <BookTitle>
            <h4>불편한 편의점에 오신 걸 어쩌고 라라라</h4>
            <span>베르나르 베르베르</span>
          </BookTitle>
          <BookLocation>
            <span className="orange">대여중</span>
            서초구 방배동
          </BookLocation>
          <BookPrice>
            <div>
              <span>대여료</span>
              <p>2,000원</p>
            </div>
            <div>
              <span>보증금</span>
              <p>15,000원</p>
            </div>
          </BookPrice>
          <BookState>
            <p className="bookmark">0</p>
            <p className="loanCount">0</p>
          </BookState>
        </dd>
      </BookBox>
    </BookWrap>
  );
};

export default BookOnLoadPage;
