/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import style from './RentBtn.style';
import vector from '../../../assets/img/btn/Vector.png';
import SelectPopupBottom from '../../../components/Modal/SelectPopupBottom';
import bookApi from '../../../util/BookApi';

const RentBtn = ({ userStatus, status, bookId }) => {
  const { LeftBox } = style;
  const { updateBookStatus } = bookApi;

  const [statusMsg, setStatusMsg] = useState('대여가능');
  const [color, setColor] = useState('blue');
  const [showModal, setShowModal] = useState(false);

  const statusList = [
    { msg: '대여가능', eng: 'ABLE' },
    { msg: '대여중', eng: 'ING' },
    { msg: '예약중', eng: 'ON' },
  ];
  const [contentList, setContentList] = useState();
  const [currentState, setCurrentState] = useState();

  const showRentState = () => {
    const gradeList = [];
    statusList.map(item =>
      gradeList.push({
        onClick: async () => {
          setCurrentState(item.msg);
          const result = await updateBookStatus(bookId, item.eng);
          console.log(result);
          setShowModal(false);
        },
        message: item.msg,
      }),
    );
    setContentList([...gradeList]);
  };

  useEffect(() => {
    if (status === 'ABLE') {
      setStatusMsg('대여가능');
      if (userStatus) {
        setColor('blue');
      } else {
        setColor('bigBlue');
      }
    } else if (status === 'ON') {
      setStatusMsg('예약중');
      if (userStatus) {
        setColor('gray');
      } else {
        setColor('bigGray');
      }
    } else if (status === 'ING') {
      setStatusMsg('대여중');
      if (userStatus) {
        setColor('orange');
      } else {
        setColor('bigOrange');
      }
    }
  }, []);

  const handleModal = () => {
    showRentState();
    setShowModal(true);
  };

  if (!userStatus) {
    //대여자
    return (
      <>
        <LeftBox>
          <span className={color} onClick={() => handleModal()}>
            {statusMsg}
            <img src={vector} alt={'대여 상태 선택'} />
          </span>
        </LeftBox>
        {showModal && <SelectPopupBottom title={'대여 상태 변경'} contents={contentList} />}
      </>
    );
  } else {
    //차입자
    return (
      <LeftBox>
        <span className={color}>{statusMsg}</span>
      </LeftBox>
    );
  }
};

export default RentBtn;
