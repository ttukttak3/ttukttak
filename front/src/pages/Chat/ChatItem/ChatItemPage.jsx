import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setTitle, setBack, setAlert } from '../../../app/headerSlice';
import ChatBookInfo from './ChatBookInfo';

const ChatItemPage = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    //chatting 방 정보 api
    dispatch(setTitle('대화자이름!'));
    dispatch(setBack(true));
    dispatch(setAlert(true));

    return () => {
      // second;
    };
  }, []);

  return (
    <>
      <ChatBookInfo></ChatBookInfo>
      <div>{chatId}</div>
    </>
  );
};

export default ChatItemPage;
