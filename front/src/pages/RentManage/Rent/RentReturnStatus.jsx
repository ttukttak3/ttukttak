import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RentGoLink from './RentGoLink';
import style from './RentReturnStatus.style';
import { setBack, setMore, setAllFalse, setTitle } from '../../../app/headerSlice';

const RentReturnStatus = ({ info, extendCnt }) => {
  const { Wrapper, BookBox, Book, Info, Price } = style;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle('대여내역'));
    dispatch(setBack(true));
    dispatch(setMore(true));
  }, [dispatch]);

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
              <span>차입자</span> {info.lender?.nickname}, {info.homeTown?.town?.longAddress}
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
            연장료(1회당 1,000원)<p>{extendCnt * 1000}원</p>
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
      <RentGoLink bookId={info.book?.id} chatId={info.roomId} ownerId={info.owner?.id}></RentGoLink>
    </Wrapper>
  );
};

export default RentReturnStatus;
