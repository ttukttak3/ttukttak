/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import style from './BookDetailPage.style';
import rentApi from '../../../util/RentApi';
import noImg from '../../../assets/img/logo/postp_default.svg';

const LenderInfoPage = ({ owner, userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const onClickHandler = () => {
    if (userId === owner.id) {
      navigate('/account');
    } else {
      navigate('/userAccount', { state: { id: owner.id } });
    }
  };

  //빌려준 횟수, 빌린 횟수
  const param = { pageNum: 1, userId: owner.id };

  const [rentList, setRentList] = useState([]);
  const [borrowList, setBorrowList] = useState([]);
  const { getRentList, getBorrowList } = rentApi;

  useEffect(() => {
    param.userId && getRentList(param, setRentList);
    param.userId && getBorrowList(param, setBorrowList);
  }, [dispatch, getRentList, getBorrowList, owner]);

  const { LenderWrap, LenderInfo, Counting } = style;
  return (
    <LenderWrap>
      <LenderInfo onClick={() => onClickHandler()}>
        <img src={owner.imageUrl} onError={onErrorImg} alt="이미지" />
        <div>
          <h2>{owner.nickName}</h2>
          <p>{owner.address}</p>
        </div>
      </LenderInfo>
      <Counting>
        <dt>빌려준 횟수</dt>
        <dd>{rentList.totalElements}회</dd>
      </Counting>
      <Counting>
        <dt>빌린 횟수</dt>
        <dd>{borrowList.totalElements}회</dd>
      </Counting>
    </LenderWrap>
  );
};

export default LenderInfoPage;
