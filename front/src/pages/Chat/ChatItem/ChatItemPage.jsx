/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setTitle, setBack, setAlert } from '../../../app/headerSlice';
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

  const { connect, publish } = chatSocketApi;
  const { getChatRoomInfo, readMessages } = messageApi;
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const client = useRef({});

  useEffect(() => {
    //chatting 방 정보 api
    //roomID로 조회시, 현재 채팅방 정보 나오는 api 필요

    connect(client);

    //여태까지 message chatMessages에 저장하기
    //messages/{roomId} GET
    getChatRoomInfo(roomId, setChatMessages, setMembers);

    //messageId-> 마지막 메세지의 id --> 메세지 올때마다 호출해야함,,
    readMessages(2, userId, roomId);
    // readMessages(messageId, userId, roomId);

    dispatch(setBack(true));
    dispatch(setAlert(true));

    return () => {
      //final. client deactivate
      client.current.deactivate();
    };
  }, []);

  // useEffect(() => {
  //   //상대방 골라내기
  //   const other = members.filter(item, index => item.id !== userId)[0];
  //   console.log(other);
  //   dispatch(setTitle(other.name));

  //   setOtherUser(other);
  // }, [members]);

  return (
    <Wrapper>
      <ChatBookInfo></ChatBookInfo>
      {/* <ChatMessage side={'left'} message={'안녕'}></ChatMessage>
      <ChatMessage side={'right'} message={'안녕하세요'}></ChatMessage> */}
      {chatMessages.map((item, idx) => (
        <>{userId === 1 ? <ChatMessage side={'right'} message={item.message}></ChatMessage> : <ChatMessage side={'left'} message={item.message}></ChatMessage>}</>
      ))}
      <ChatFooter message={message} client={client} publish={() => publish(roomId, userId, client, setMessage, message)} setMessage={setMessage} roomId={roomId}></ChatFooter>
    </Wrapper>
  );
};

export default ChatItemPage;
