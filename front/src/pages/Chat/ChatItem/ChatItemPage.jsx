/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setTitle, setBack, setAlert, setAllFalse } from '../../../app/headerSlice';
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
  const { connect } = chatSocketApi;
  const { getChatRoomInfo, readMessages } = messageApi;
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState([]);
  const [myMemberInfo, setMyMemberInfo] = useState({});
  const [otherMemberInfo, setOtherMemberInfo] = useState({});

  const client = useRef({});

  useEffect(() => {
    connect(client, roomId, setChatMessages, setMessage);
    getChatRoomInfo(roomId, setChatMessages, setMembers);

    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setAlert(true));

    return () => {
      client.current.deactivate();
    };
  }, []);

  useEffect(() => {
    if (chatMessages.length > 0) {
      const messageId = chatMessages[chatMessages.length - 1].messages.id;
      readMessages(messageId, myMemberInfo.memberId, roomId);
    }
  }, [chatMessages]);

  useEffect(() => {
    // 상대방 골라내기
    console.log(members);
    if (members.length > 0) {
      const myMember = members.filter(item => userId === item.user.id)[0];
      const otherMember = members.filter(item => userId !== item.user.id)[0];
      dispatch(setTitle(otherMember.nickname));
      setOtherMemberInfo(otherMember);
      setMyMemberInfo(myMember);
    }
  }, [members]);

  return (
    <Wrapper>
      <ChatBookInfo></ChatBookInfo>
      {chatMessages.map((item, idx) => (
        <>{userId === item.userId ? <ChatMessage side={'right'} message={item.message}></ChatMessage> : <ChatMessage side={'left'} message={item.message}></ChatMessage>}</>
      ))}
      <ChatFooter roomId={roomId} message={message} memberId={myMemberInfo.memberId} client={client} setMessage={setMessage}></ChatFooter>
    </Wrapper>
  );
};

export default ChatItemPage;
