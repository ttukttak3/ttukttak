/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import style from './BorrowReturnStatus.style';
import { useDispatch } from 'react-redux';
import { setBack, setTitle, setMore } from '../../../app/headerSlice';
import BorrowGoLink from './BorrowGoLink';

const BorrowReturnStatus = ({ info }) => {
  //반납 후 상태
  const dispatch = useDispatch();
  const { Wrapper, BookBox, Book, Info, Price } = style;
  useEffect(() => {
    dispatch(setTitle('대여내역'));
    dispatch(setBack(true));
    dispatch(setMore(true));
  }, [dispatch, info.status]);

  return (
    <Wrapper>
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
      <BorrowGoLink bookId={info.book?.id} chatId={info.book?.id} ownerId={info.owner?.id}></BorrowGoLink>
    </Wrapper>
  );
};

export default BorrowReturnStatus;
