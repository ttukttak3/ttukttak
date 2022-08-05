/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllFalse, setBack, setTitle, setMore } from '../../../app/headerSlice';
import style from './ReturnDetail.style';
import noImg from '../../../assets/img/logo/homeb_default.svg';

const ReturnDetail = () => {
  const dispatch = useDispatch();
  //-------------- Header & Footer Off --------------
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle('대여 내역'));
    dispatch(setMore(true));
  }, [dispatch]);
  const { Wrapper, BookBox, Book, Info, Price, GoPage } = style;
  return (
    <Wrapper>
      {/* 반납 완료 도서 상세 */}
      <BookBox>
        <h2>2022.06.28 반납완료</h2>
        <Book>
          <img src={noImg} alt="도서 이미지" />
          <Info>
            <h4>불편한 편의점 방구 열심히</h4>
            <h6>김호중</h6>
            <p>
              <span>차입자</span> 하얀 마음은 아이유 노래, 서초구 방배동
            </p>
          </Info>
        </Book>
      </BookBox>
      <Price>
        <ul>
          <li>
            보증금, 대여료<p>15,000원, 2,000원</p>
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

export default ReturnDetail;
