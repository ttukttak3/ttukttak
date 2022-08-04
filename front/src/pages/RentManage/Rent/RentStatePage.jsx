/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllFalse, setBack } from '../../../app/headerSlice';
import style from './RentStatePage.style';

const RentStatePage = () => {
  const dispatch = useDispatch();
  //-------------- Header & Footer Off --------------
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
  }, [dispatch]);
  const { Wrapper, Progress, State, Price, GoPage } = style;
  return (
    <Wrapper>
      <Progress>
        <div>
          <h2>대여가 진행중이에요</h2>
          <p>대여자님이 원하는 책 한 권의 우연한 만남으로 이웃과 시작한 소통을 나눠보세요.</p>
        </div>
        <div>progress bar 구현 예정</div>
      </Progress>
      <State>
        <h3>
          대여 상태 변경하기 <button>대여 중</button>
        </h3>
        <div>
          <button>연장 1회차 적용하기</button>
          <button>연장 2회차 적용하기</button>
        </div>
      </State>
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

export default RentStatePage;
