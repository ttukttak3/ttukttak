import React from 'react';
import PropTypes from 'prop-types';
import style from './HomePage.style';

const BookListItem = ({ id, thumbnail, grade, subject, author, address, status, deposit, rating, rentCnt }) => {
  const { BookBox, BookTitle, BookLocation, BookPrice, BookState } = style;

  return (
    <BookBox key={id}>
      <dt>
        <img src={thumbnail} alt="썸네일" />
        <button>{grade}</button>
      </dt>
      <dd>
        <BookTitle>
          <h4>{subject}</h4>
          <span>{author}</span>
        </BookTitle>
        <BookLocation>
          <span className="blue">{status === 'ABLE' ? '대여가능' : ''}</span>
          {address}
        </BookLocation>
        <BookPrice>
          <div>
            <span>대여료</span>
            <p>2,000원</p>
          </div>
          <div>
            <span>보증금</span>
            <p>{deposit}원</p>
          </div>
        </BookPrice>
        <BookState>
          <p className="bookmark">{rating}</p>
          <p className="loanCount">{rentCnt}</p>
        </BookState>
      </dd>
    </BookBox>
  );
};

BookListItem.defaultProps = {
  id: 0,
  thumbnail: '',
  grade: 'A',
  subject: '불편한 편의점에 오신 걸 어쩌고 라라라',
  author: '베르나르 베르베르',
  address: '서초구 방배동',
  status: '대여가능',
  deposit: 15000,
  rating: 0,
  rentCnt: 0,
};

BookListItem.propTypes = {
  id: PropTypes.number,
  thumbnail: PropTypes.string,
  grade: PropTypes.string,
  subject: PropTypes.string,
  author: PropTypes.string,
  address: PropTypes.string,
  status: PropTypes.string,
  deposit: PropTypes.number,
  rating: PropTypes.number,
  rentCnt: PropTypes.number,
};

export default BookListItem;
