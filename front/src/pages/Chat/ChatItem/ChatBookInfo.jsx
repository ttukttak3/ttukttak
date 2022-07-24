import React from 'react';
import bookApi from '../../../util/BookApi';
import style from './ChatBookInfo.style';

const ChatBookInfo = ({ book }) => {
  const { Wrapper, BookImg, Title, Author, Location, Status, Price } = style;
  // const { name, author, deposit, bookTown } = book;
  return (
    <Wrapper>
      {/* <BookImg>
        <img src={BookImg} alt="도서이미지" />
      </BookImg>
      <Title>{name}</Title>
      <Author>{author}</Author>
      <Location>{bookTown.address}</Location> */}
      <Status></Status>
      <Price>대여료 2,000원 보증금 15,000원</Price>
    </Wrapper>
  );
};

export default ChatBookInfo;
