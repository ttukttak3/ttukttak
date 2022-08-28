/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import messageApi from '../../../util/MessageApi';
import { setAllFalse, setBack, setBackX, setTitle, setMore } from '../../../app/headerSlice';
import SelectPopupBottom from '../../../components/Modal/SelectPopupBottom';
import bar1 from '../../../assets/img/userInterFace/bar1.svg';
import bar2 from '../../../assets/img/userInterFace/bar2.svg';
//연체바 import bar3 from '../../../assets/img/userInterFace/bar3.svg';
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
    fetchingData();
    if (info.status !== 'RENTED') {
      dispatch(setAllFalse());
      dispatch(setTitle('대여내역'));
      dispatch(setBack(true));
      dispatch(setMore(true));
    } else {
      dispatch(setAllFalse());
      dispatch(setBackX(true));
      //새로고침버튼 그것도 달아야 함!
    }
  }, [dispatch, info.status]);

  const fetchingData = async () => {
    const returnData = await getRentDetail(rentId);
    //console.log(returnData);
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
  const dateFormatter = date => {
    //08-05
    const list = date.split('-');
    return String(Number(list[0])) + '월 ' + String(Number(list[1])) + '일';
  };

  const { Wrapper, Title, Progress, BarBox, BarDate, BarState, BookBox, Book, Info, State, Price, GoPage } = style;
  return (
    <Wrapper>
      {info.status === 'RENTED' ? (
        <>
          {extendCnt === 0 ? (
            <>
              <Title>
                <div>
                  <h2>대여가 진행중이에요</h2>
                  <p>대여자님이 원하는 책 한 권의 우연한 만남으로 이웃과 시작한 소통을 나눠보세요.</p>
                </div>
              </Title>
              <Progress>
                <BarBox>
                  <BarDate>
                    <p>{dateFormatter(info.beginDate.substring(5))}</p>
                    <p>
                      {dateFormatter(info.endDate.substring(5))}
                      <span>반납 예정</span>
                    </p>
                  </BarDate>
                  <img src={bar1} alt="진행바" />
                  <BarState>
                    <p>대여시작</p>
                    <p>반납완료</p>
                  </BarState>
                </BarBox>
              </Progress>
            </>
          ) : extendCnt === 1 ? (
            <>
              <Title>
                <div>
                  <h2>대여 연장이 1회 적용되었어요</h2>
                  <p>차입자는 반납 예정일 이전에 연장을 최대 2회까지 요청할 수 있으며, 대여자는 1,000원의 연장료를 요구 가능합니다.</p>
                </div>
              </Title>
              <Progress>
                <BarBox>
                  <BarDate>
                    <p>{dateFormatter(info.beginDate.substring(5))}</p>
                    <p className="center">{dateFormatter(info.beginDate.substring(5))}</p>
                    <p>
                      {dateFormatter(info.endDate.substring(5))}
                      <span>반납 예정</span>
                    </p>
                  </BarDate>
                  <img src={bar2} alt="연장바" />
                  <BarState>
                    <p>대여시작</p>
                    <p className="center">연장 1회차</p>
                    <p>반납완료</p>
                  </BarState>
                </BarBox>
              </Progress>
            </>
          ) : extendCnt === 2 ? (
            <>
              <Title>
                <div>
                  <h2>대여 연장이 2회 적용되었어요</h2>
                  <p>차입자는 반납 예정일 이전에 연장을 최대 2회까지 요청할 수 있으며, 대여자는 1,000원의 연장료를 요구 가능합니다.</p>
                </div>
              </Title>
              <Progress>
                <BarBox>
                  <BarDate>
                    <p>{dateFormatter(info.beginDate.substring(5))}</p>
                    <p className="center">{dateFormatter(info.beginDate.substring(5))}</p>
                    <p>
                      {dateFormatter(info.endDate.substring(5))}
                      <span>반납 예정</span>
                    </p>
                  </BarDate>
                  <img src={bar2} alt="연장바" />
                  <BarState>
                    <p>대여시작</p>
                    <p className="center">연장 2회차</p>
                    <p>반납완료</p>
                  </BarState>
                </BarBox>
              </Progress>
            </>
          ) : (
            ''
          )}
          {/* <progress id="progress" value="50" min="0" max="100"></progress>
              <date>{dateFormatter(info.beginDate.substring(5))}</date>
              <start>대여시작</start> */}
          {/* 일정한 간격으로 벌어지게는 어떻게 해야할까요,,  */}
          {/* {info.extendList.map(extend => (
                <>
                  <date>{dateFormatter(info.beginDate.substring(5))}</date>
                  <start>대여시작</start>
                </>
              ))} */}
          <State>
            <h3>
              대여 상태 변경하기 <button onClick={() => choseRentState()}>대여 중</button>
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
