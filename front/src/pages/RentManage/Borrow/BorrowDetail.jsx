/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../util/RentApi';
import BorrowStatus from './BorrowStatus';
import BorrowReturnStatus from './BorrowReturnStatus';

const BorrowDetail = () => {
  const { rentId } = useParams();
  const { getRentDetail } = api;
  const [info, setInfo] = useState({});
  const [book, setBook] = useState({});
  const [extendCnt, setExtendCnt] = useState(0);

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    const returnData = await getRentDetail(rentId);
    console.log(returnData);
    if (returnData.returnDate) {
      returnData.returnDate = returnData.returnDate.replaceAll('-', '.');
    }
    if (returnData.book.deposit) {
      returnData.book.deposit = returnData.book.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    setBook({ ...book, ...returnData.book });
    setInfo({ ...info, ...returnData });
    //연장 여부 체크 이걸로 바 걸 것임.
    if (returnData.extendList.length === 0) {
      setExtendCnt(0);
      console.log('0회');
    }
  };

  return <>{info.status === 'RENTED' ? <BorrowStatus info={info} extendCnt={extendCnt}></BorrowStatus> : <BorrowReturnStatus info={info}></BorrowReturnStatus>}</>;
};

export default BorrowDetail;
