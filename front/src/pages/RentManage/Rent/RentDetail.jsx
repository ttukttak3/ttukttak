/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import messageApi from '../../../util/MessageApi';
import { setAllFalse, setBack, setBackX, setTitle, setMore } from '../../../app/headerSlice';
import SelectPopupBottom from '../../../components/Modal/SelectPopupBottom';
import downBtn from '../../../assets/img/arrows/white_down.svg';
import style from './RentDetail.style';
import api from '../../../util/RentApi';

const RentedDetail = () => {
  const dispatch = useDispatch();
  const { rentId } = useParams();
  const { makeChatRoom } = messageApi;
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.userId);
  const { getRentDetail, returnRent, extendRent } = api;
  const [info, setInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('대여 상태');
  const [extendList, setExtendList] = useState([]);
  const [firstExtend, setFirstExtend] = useState('');
  const [secondExtend, setSecondExtend] = useState('');
  const [extendCnt, setExtendCnt] = useState(0);
  const [contentList, setContentList] = useState([
    {
      message: '대여중',
      onClick: () => {
        setShowModal(false);
      },
    },
    {
      message: '반납',
      onClick: async () => {
        await returnRent(rentId);
        setShowModal(false);
      },
    },
  ]);

  //-------------- Header & Footer Off --------------
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
  }, [dispatch]);

  useEffect(() => {
    fetchingData();
    if (info.status !== 'RENTED') {
      dispatch(setTitle('대여내역'));
      dispatch(setBack(true));
      dispatch(setMore(true));
    } else {
      dispatch(setBackX());
      //새로고침인가 그것도 달아야 함!
    }
  }, [dispatch, info.status]);

  const fetchingData = async () => {
    const returnData = await getRentDetail(rentId);
    console.log(returnData);
    setExtendList([...extendList, ...returnData.extendList]);
    setInfo({ ...info, ...returnData });
    //연장 여부 체크
    if (returnData.extendList.length === 0) {
      setFirstExtend('');
      setSecondExtend('gray');
      setExtendCnt(0);
    } else if (returnData.extendList.length === 1) {
      setFirstExtend('gray');
      setSecondExtend('');
      setExtendCnt(1);
    } else if (returnData.extendList.length === 2) {
      setFirstExtend('gray');
      setSecondExtend('gray');
      setExtendCnt(2);
    }
  };

  const choseRentState = () => {
    setShowModal(true);
  };

  const chatWithUser = async () => {
    console.log(info.book?.id, userId);
    const result = await makeChatRoom(info.book?.id, userId);
    console.log(result);
    navigate(`/chat/${result.roomId}`);
  };

  const extendRentResult = async times => {
    if ((firstExtend === '' && times === 1) || (secondExtend === '' && times === 2)) {
      const returnData = await extendRent(rentId);
      console.log(returnData);
    }
  };

  const { Wrapper, Title, Progress, BookBox, Book, Info, State, Price, GoPage } = style;
  return (
    <Wrapper>
      {info.status === 'RENTED' ? (
        <>
          <Title>
            <div>
              <h2>대여가 진행중이에요</h2>
              <p>대여자님이 원하는 책 한 권의 우연한 만남으로 이웃과 시작한 소통을 나눠보세요.</p>
            </div>
            <Progress>
              <progress id="progress" value="50" min="0" max="100"></progress>
            </Progress>
          </Title>
          <State>
            <h3>
              대여 상태 변경하기 <button onClick={() => choseRentState()}>대여 중</button>
              <img src={downBtn} alt={'대여 상태 선택'} />
            </h3>
            <div>
              <button onClick={() => extendRentResult(1)} className={firstExtend}>
                연장 1회차 적용하기
              </button>
              <button onClick={() => extendRentResult(2)} className={secondExtend}>
                연장 2회차 적용하기
              </button>
            </div>
          </State>
          {showModal && <SelectPopupBottom title={modalTitle} contents={contentList} />}
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
      <GoPage>
        <ul>
          <li onClick={() => navigate(`/detailBook`, { replace: true, state: { id: info.book.id } })}>도서 포스트 바로가기</li>
          <li>차입자와의 채팅</li>
          <li onClick={() => navigate('/userAccount', { state: { id: info.owner.id } })}>차입자 프로필</li>
        </ul>
      </GoPage>
    </Wrapper>
  );
};

export default RentedDetail;
