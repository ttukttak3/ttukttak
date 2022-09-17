/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RentGoLink from './RentGoLink';
import SelectPopupBottom from '../../../components/Modal/SelectPopupBottom';
import { setAllFalse, setBackX } from '../../../app/headerSlice';
import rentApi from '../../../util/RentApi';
import bar1 from '../../../assets/img/userInterFace/bar1.svg';
import bar2 from '../../../assets/img/userInterFace/bar2.svg';
import style from './RentStatus.style';

const RentStatus = ({ info, extendCnt, firstExtend, secondExtend }) => {
  const { Wrapper, Title, Progress, BarBox, BarDate, BarState, State, Price } = style;
  const { returnRent } = rentApi;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('대여 상태');
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
        //정말 반납하시겠습니가? 이런거 안띄우나
        await returnRent(info.id);
        setShowModal(false);
      },
    },
  ]);

  const choseRentState = () => {
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBackX(true));
    //새로고침버튼 그것도 달아야 함!
  }, [dispatch]);

  const dateFormatter = date => {
    //08-05
    const list = date.split('-');
    return String(Number(list[0])) + '월 ' + String(Number(list[1])) + '일';
  };

  const extendRentResult = async times => {
    if ((firstExtend === '' && times === 1) || (secondExtend === '' && times === 2)) {
      const returnData = await extendRent(rentId);
      console.log(returnData);
    }
  };

  return (
    <Wrapper>
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

export default RentStatus;
