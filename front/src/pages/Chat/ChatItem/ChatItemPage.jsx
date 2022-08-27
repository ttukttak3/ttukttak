/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setTitle, setBack, setAlert, setAllFalse } from '../../../app/headerSlice';
import ChatBookInfo from './ChatBookInfo';
import ChatFooter from './ChatFooter';
import chatSocketApi from '../../../util/ChatSocketApi';
import messageApi from '../../../util/MessageApi';
import ChatMessage from './ChatMessage';
import style from './ChatItemPage.style';
import { useSelector } from 'react-redux';

const ChatItemPage = () => {
  const location = useLocation();
  const roomId = location.state.id;
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
      dispatch(setTitle(otherMember.user.nickname === null ? '탈퇴한 회원' : otherMember.user.nickname));
      setOtherMemberInfo(otherMember);
      setMyMemberInfo(myMember);
    }
  }, [members]);

  //메시지 스크롤 바텀으로 보내기
  const scrollToBottom = () => {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(scrollToBottom, [chatMessages]);

  return (
    <Wrapper>
      {Object.keys(book).length > 0 && otherMemberInfo?.user?.id && <ChatBookInfo book={book} lenderId={otherMemberInfo?.user?.id} roomId={roomId}></ChatBookInfo>}
      <MessageBox className={Object.keys(book).length > 0 && otherMemberInfo?.user?.id ? '' : 'hide'}>
        {chatMessages.map((item, idx) => {
          let dateMessage = '';
          if (item.sendedAt.substring(0, 10) !== date) {
            date = item.sendedAt.substring(0, 10);
            dateMessage = new Date(item.sendedAt).toLocaleDateString('ko-kr', { month: 'long', day: 'numeric' });
          }
          return (
            <div key={idx} className="messageBox">
              <DateMessage className={dateMessage ? '' : 'hide'}>{dateMessage}</DateMessage>
              <ChatMessage item={item} side={item.memberId === myMemberInfo.memberId ? 'another' : ''}></ChatMessage>
            </div>
          );
        })}
      </MessageBox>
      <ChatFooter roomId={roomId} message={message} memberId={myMemberInfo.memberId} client={client} setMessage={setMessage}></ChatFooter>
    </Wrapper>
  );
};

export default ChatItemPage;
