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
  const { Wrapper, MessageBox, DateMessage } = style;
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.user);
  const { connect } = chatSocketApi;
  const { getChatRoomInfo, readMessages } = messageApi;
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState([]);
  const [myMemberInfo, setMyMemberInfo] = useState({});
  const [book, setBook] = useState({});
  const [otherMemberInfo, setOtherMemberInfo] = useState({});

  const client = useRef({});

  let date = '';

  useEffect(() => {
    connect(client, roomId, setChatMessages);
    chatRoomInfo();
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setAlert(true));

    return () => {
      client.current.deactivate();
    };
  }, []);

  const chatRoomInfo = async () => {
    const data = await getChatRoomInfo(roomId, setChatMessages, setMembers);
    console.log(data);
    setBook({ ...book, ...data.book });
  };

  useEffect(() => {
    if (chatMessages.length > 0 && myMemberInfo.memberId) {
      const currentMsg = chatMessages[chatMessages.length - 1];
      const messageId = currentMsg.id;
      const memberId = currentMsg.memberId;
      if (memberId === otherMemberInfo.memberId) {
        readMessages(messageId, myMemberInfo.memberId, roomId);
      }
    }
  }, [chatMessages, myMemberInfo]);

  useEffect(() => {
    // 상대방 골라내기
    if (members.length > 0) {
      const myMember = members.filter(item => userId === item.user.id)[0];
      const otherMember = members.filter(item => userId !== item.user.id)[0];
      dispatch(setTitle(otherMember.user.nickname));
      setOtherMemberInfo(otherMember);
      setMyMemberInfo(myMember);
    }
  }, [members]);

  return (
    <Wrapper>
      {Object.keys(book).length > 0 && otherMemberInfo?.user?.id && <ChatBookInfo book={book} lenderId={otherMemberInfo?.user?.id} roomId={roomId}></ChatBookInfo>}
      <MessageBox>
        {chatMessages.map((item, idx) => {
          //대화 첫 시작시 이것만 찍혀서 변경해야함.
          // if (item.sendedAt.substring(0, 10) !== date) {
          //   date = item.sendedAt.substring(0, 10);
          //   return <DateMessage>{new Date(item.sendedAt).toLocaleDateString('ko-kr', { month: 'long', day: 'numeric' })}</DateMessage>;
          // }

          if (myMemberInfo.memberId === item.memberId) {
            return <ChatMessage side={'right'} item={item}></ChatMessage>;
          } else {
            return <ChatMessage side={'left'} item={item}></ChatMessage>;
          }
        })}
      </MessageBox>
      <ChatFooter roomId={roomId} message={message} memberId={myMemberInfo.memberId} client={client} setMessage={setMessage}></ChatFooter>
    </Wrapper>
  );
};

export default ChatItemPage;
