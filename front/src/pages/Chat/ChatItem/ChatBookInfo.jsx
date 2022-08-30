/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import RentBtn from './RentBtn';
import style from './ChatBookInfo.style';
import pin_drop from '../../../assets/img/userInterFace/pin_drop.png';
import noImg from '../../../assets/img/logo/postp_default.svg';

import { useSelector } from 'react-redux';

const ChatBookInfo = ({ book, lenderId, roomId }) => {
  const { Wrapper, BookImg, Title, Author, Location, Status, InfoWrapper, LeftBox } = style;
  const { id, subject, author, deposit, bookTown, bookInfo, status, imageUrls, owner } = book;
  const { userId } = useSelector(state => state.user);

  // 콤마
  const chgDeposit = book.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  return (
    <Wrapper>
      <BookImg>
        <img onError={onErrorImg} src={imageUrls[0] ? imageUrls[0].imageUrl : ''} alt="도서이미지" />
      </BookImg>
      <InfoWrapper>
        <Title>
          <p>{subject}</p>
          <span>{author}</span>
        </Title>
        <Location>
          <img src={pin_drop} alt={'위치 아이콘'}></img>
          <p>{bookTown?.longAddress}</p>
        </Location>
        <Status>
          <RentBtn userStatus={owner.id === userId} status={status} bookId={id} lenderId={lenderId} roomId={roomId}></RentBtn>
          <div>
            <p>대여료</p>
            <p>2,000원</p>
          </div>
          <div>
            <p>보증금</p>
            <p>{chgDeposit}원</p>
          </div>
        </Status>
      </InfoWrapper>
    </Wrapper>
  );
};

export default ChatBookInfo;
