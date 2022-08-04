/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import RentBtn from './RentBtn';
import style from './ChatBookInfo.style';
import pin_drop from '../../../assets/img/userInterFace/pin_drop.png';

import { useSelector } from 'react-redux';

const ChatBookInfo = ({ book, lenderId, roomId }) => {
  const { Wrapper, BookImg, Title, Author, Location, Status, InfoWrapper, LeftBox } = style;
  const { id, subject, author, deposit, bookTown, bookInfo, status, imageUrls, owner } = book;
  const { userId } = useSelector(state => state.user);

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
          <RentBtn userStatus={owner.id === userId} status={status} bookId={id} lenderId={lenderId} roomId={roomId}></RentBtn>,
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
