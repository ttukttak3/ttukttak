/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAllFalse, setBack, setTitle, setMore } from '../../../app/headerSlice';
import api from '../../../util/RentApi';
import style from './BorrowDetail.style';
import noImg from '../../../assets/img/logo/homeb_default.svg';

const BorrowDetail = () => {
  const { Wrapper, Progress, BookBox, Book, Info, State, Price, GoPage } = style;
  const dispatch = useDispatch();
  const { rentId } = useParams();
  const { getRentDetail } = api;
  const [info, setInfo] = useState({});
  const [book, setBook] = useState({});
  //-------------- Header & Footer Off --------------
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setMore(true));
  }, [dispatch]);

  const fetchingData = async () => {
    const returnData = await getRentDetail(rentId);
    console.log(returnData);
    setBook({ ...book, ...returnData.book });
    setInfo({ ...info, ...returnData });
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <Wrapper>
      {info.status === 'RENTED' ? (
        <>
          <Progress>
            <div>
              <h2>대여가 진행중이에요</h2>
              <p>대여자님이 원하는 책 한 권의 우연한 만남으로 이웃과 시작한 소통을 나눠보세요.</p>
            </div>
            <div>progress bar 구현 예정</div>
          </Progress>
        </>
      ) : (
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
      )}
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
      <GoPage>
        <ul>
          <li>도서 포스트 바로가기</li>
          <li>대여자와의 채팅</li>
          <li>대여자 프로필</li>
        </ul>
      </GoPage>
    </Wrapper>
  );
};

export default BorrowDetail;
