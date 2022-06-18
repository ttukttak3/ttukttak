import React from 'react';
import style from './ChatBookInfo.style';

const ChatBookInfo = () => {
  const { Wrapper, BookImg, Title, Author, Location, Status, Price } = style;
  return (
    <Wrapper>
      <BookImg></BookImg>
      <Title>당신은 결국 무엇이든 </Title>
      <Author></Author>
      <Location></Location>
      <Status></Status>
      <Price>대여료 2,000원 보증금 15,000원</Price>
    </Wrapper>
  );
};

export default ChatBookInfo;
