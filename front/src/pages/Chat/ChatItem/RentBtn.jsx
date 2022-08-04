/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import style from './RentBtn.style';
import vector from '../../../assets/img/btn/Vector.png';
import SelectPopupBottom from '../../../components/Modal/SelectPopupBottom';
import bookApi from '../../../util/BookApi';
import RentApi from '../../../util/RentApi';
const RentBtn = ({ userStatus, status, bookId, lenderId, roomId }) => {
  const { LeftBox } = style;
  const { updateBookStatus } = bookApi;
  const { postRent } = RentApi;
  const [statusMsg, setStatusMsg] = useState('대여가능');
  const [color, setColor] = useState('blue');
  const [showModal, setShowModal] = useState(false);
  const [contentList, setContentList] = useState();
  const statusList = [
    { msg: '대여가능', eng: 'ABLE', color: 'bigBlue' },
    { msg: '대여중', eng: 'ING', color: 'bigGray' },
    { msg: '예약중', eng: 'ON', color: 'bigOrange' },
  ];

  const showRentState = () => {
    const gradeList = [];
    statusList.map(item =>
      gradeList.push({
        onClick: async () => {
          await updateBookStatus(bookId, item.eng);
          setStatusMsg(item.msg);
          setColor(item.color);
          if (item.msg === '대여중') {
            await postRent(bookId, lenderId, roomId);
          }
          setShowModal(false);
        },
        message: item.msg,
      }),
    );
    setContentList([...gradeList]);
  };

  useEffect(() => {
    console.log(lenderId);
    if (status === 'ABLE') {
      setStatusMsg('대여가능');
      if (!userStatus) {
        setColor('blue');
      } else {
        setColor('bigBlue');
      }
    } else if (status === 'ON') {
      setStatusMsg('예약중');

      if (!userStatus) {
        setColor('gray');
      } else {
        setColor('bigGray');
      }
    } else if (status === 'ING') {
      setStatusMsg('대여중');

      if (!userStatus) {
        setColor('orange');
      } else {
        setColor('bigOrange');
      }
    }
  }, [status]);

  const handleModal = () => {
    showRentState();
    setShowModal(true);
  };

  if (userStatus) {
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
