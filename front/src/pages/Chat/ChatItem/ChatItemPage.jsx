/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setTitle, setBack, setAlert, setAllFalse } from '../../../app/headerSlice';
import { setUserId } from '../../../app/userSlice';
import ChatBookInfo from './ChatBookInfo';
import ChatFooter from './ChatFooter';
import chatSocketApi from '../../../util/ChatSocketApi';
import messageApi from '../../../util/MessageApi';
import ChatMessage from './ChatMessage';
import style from './ChatItemPage.style';
import { useSelector } from 'react-redux';

const ChatItemPage = () => {
  const { roomId } = useParams();
  const { Wrapper } = style;
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.user);
  // const userId = 1; //임시값
  const { connect, publish } = chatSocketApi;
  const { getChatRoomInfo, readMessages } = messageApi;
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [tempMsg, setTempMsg] = useState('');
  const client = useRef({});

  useEffect(() => {
    connect(client, roomId, setChatMessages, setMessage);

    getChatRoomInfo(roomId, setChatMessages, setMembers);

    //messageId-> 마지막 메세지의 id --> 메세지 올때마다 호출해야함,,
    // readMessages(2, userId, roomId);
    // readMessages(messageId, userId, roomId);
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setAlert(true));

    console.log(userId);

    return () => {
      client.current.deactivate();
    };
  }, []);

  useEffect(() => {
    // 상대방 골라내기
    if (members.length > 0) {
      const other = members.filter(item => userId !== item.userId)[0];
      dispatch(setTitle(other.nickname));
      setOtherUser(other);
    }
  }, [members]);

  return (
    <Wrapper>
      <ChatBookInfo></ChatBookInfo>
      {chatMessages.map((item, idx) => (
        <>{userId === item.userId ? <ChatMessage side={'right'} message={item.message}></ChatMessage> : <ChatMessage side={'left'} message={item.message}></ChatMessage>}</>
      ))}
      <ChatFooter roomId={roomId} message={message} client={client} setMessage={setMessage} publish={() => publish(roomId, userId, client, setMessage, message)}></ChatFooter>
    </Wrapper>
  );
};

export default ChatItemPage;
