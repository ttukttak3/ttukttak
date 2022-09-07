/* eslint-disable max-lines-per-function */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './BorrowStatus.style';
import bar1 from '../../../assets/img/userInterFace/bar1.svg';
import { setAllFalse, setBackX } from '../../../app/headerSlice';
import BorrowGoLink from './BorrowGoLink';

const BorrowStatus = ({ info, extendCnt }) => {
  // 반납 전 상태
  const dispatch = useDispatch();
  const { Wrapper, Progress, BookBox, Book, Info, Price } = style;

  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBackX(true));
    //새로고침인가 그것도 달아야 함!
  }, [dispatch, info.status]);

  return (
    <Wrapper>
      <Progress>
        <div>
          <h2>대여가 진행중이에요</h2>
          <p>대여자님이 원하는 책 한 권의 우연한 만남으로 이웃과 시작한 소통을 나눠보세요.</p>
        </div>
        <div>{extendCnt === 0 ? <img src={bar1} alt="" /> : ''}</div>
      </Progress>
      <BookBox>
        <h2>{info?.returnDate} 반납완료</h2>
        <Book>
          <img src={info.book?.thumbnail?.imageUrl} alt="도서 이미지" />
          <Info>
            <h4>{info.book?.subject}</h4>
            <h6>{info.book?.author}</h6>
            <p>
              <span>차입자</span> {info.lender?.nickname}, {info.lender?.homeTown?.town?.longAddress}
            </p>
          </Info>
        </Book>
      </BookBox>
      <Price>
        <ul>
          <li>
            보증금, 대여료<p>{info.book?.deposit}원, 2,000원</p>
          </li>
          <li>
            연장료(1회당 1,000원)<p>-</p>
          </li>
          <li>
            연체료(1일당 300원)<p>-</p>
          </li>
        </ul>
        <div>
          <p>돌려줄 금액(보증금-(연장료+연체료))</p>
          <p>12,100원</p>
        </div>
      </Price>
      <BorrowGoLink bookId={info.book?.id} chatId={info.roomId} ownerId={info.owner?.id}></BorrowGoLink>
    </Wrapper>
  );
};

export default BorrowStatus;
