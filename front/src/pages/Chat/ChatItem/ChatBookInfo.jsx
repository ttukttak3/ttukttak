/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import style from './ChatBookInfo.style';
import pin_drop from '../../../assets/img/userInterFace/pin_drop.png';

const ChatBookInfo = ({ book }) => {
  const { Wrapper, BookImg, Title, Author, Location, Status, InfoWrapper, LeftBox } = style;
  const { subject, author, deposit, bookTown, bookInfo, status, imageUrls } = book;
  const [statusBtn, setStatusBtn] = useState();

  useEffect(() => {
    if (status === 'ABLE') {
      setStatusBtn(
        <LeftBox>
          <span className="blue">대여가능</span>
        </LeftBox>,
      );
    } else if (status === 'ON') {
      setStatusBtn(
        <LeftBox>
          <span className="gray">예약중</span>
        </LeftBox>,
      );
    } else if (status === 'ING') {
      setStatusBtn(
        <LeftBox>
          <span className="orange">대여중</span>
        </LeftBox>,
      );
    } else {
      setStatusBtn(
        <LeftBox>
          <span className="orange">대여중</span>
        </LeftBox>,
      );
    }
    // console.log(book);
  }, [book]);

  return (
    <Wrapper>
      <BookImg>
        <img src={imageUrls[0].imageUrl} alt="도서이미지" />
      </BookImg>
      <InfoWrapper>
        <Title>
          {subject}
          <author>{bookInfo.author}</author>
        </Title>
        <Location>
          <img src={pin_drop} alt={'위치 아이콘'}></img>
          {bookTown?.longAddress}
        </Location>
        <Status>
          <div>{statusBtn}</div>
          <div>
            <p>대여료</p>
            <p>2,000원</p>
          </div>
          <div>
            <p>보증금</p>
            <p>{deposit}원</p>
          </div>
        </Status>
      </InfoWrapper>
    </Wrapper>
  );
};

export default ChatBookInfo;
