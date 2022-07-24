import React from 'react';
import style from './ChatBookInfo.style';

const ChatBookInfo = ({ book }) => {
  const { Wrapper, BookImg, Title, Author, Location, Status, Price } = style;
  const { name, author, deposit, bookTown, bookInfo, status } = book;

  return (
    <Wrapper>
      <BookImg>{/* <img src={book?.bookInfo?.image} alt="도서이미지" /> */}</BookImg>
      <Title>{name}</Title>
      <Author>{author}</Author>
      <Location>{bookTown?.address}</Location>
      <Status>{status}</Status>
      <Price>대여료 2,000원 보증금 {deposit}원</Price>
    </Wrapper>
  );
};

export default ChatBookInfo;
