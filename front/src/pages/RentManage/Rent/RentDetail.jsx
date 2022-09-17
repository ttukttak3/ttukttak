/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import messageApi from '../../../util/MessageApi';
import api from '../../../util/RentApi';
import RentStatus from './RentStatus';
import RentReturnStatus from './RentReturnStatus';

const RentedDetail = () => {
  const { rentId } = useParams();
  const { makeChatRoom } = messageApi;
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.userId);
  const { getRentDetail, returnRent, extendRent } = api;
  const [info, setInfo] = useState({});

  const [extendList, setExtendList] = useState([]);
  const [firstExtend, setFirstExtend] = useState('');
  const [secondExtend, setSecondExtend] = useState('');
  const [extendCnt, setExtendCnt] = useState(0);

  //-------------- Header & Footer Off --------------
  useEffect(() => {
    fetchingData();
  }, []);

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

  return (
    <>
      {info.status === 'RENTED' ? (
        <RentStatus info={info} extendCnt={extendCnt} firstExtend={firstExtend} secondExtend={secondExtend}></RentStatus>
      ) : (
        <RentReturnStatus info={info} extendCnt={extendCnt}></RentReturnStatus>
      )}
    </>
  );
};

export default RentedDetail;
