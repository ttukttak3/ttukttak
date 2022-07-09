/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle, setBack } from '../../../app/headerSlice';
import ChatListItem from '../ChatList/ChatListItem';
import Wrapper from '../ChatList/ChatPage.style';
import messageApi from '../../../util/MessageApi';
const ChatPage = () => {
  const [chatList, setChatList] = useState([]);

  const { getChatList, makeChatRoom } = messageApi;

  const ChatListShow = chatList.map((item, idx) => (
    <ChatListItem id={item.roomId} imgUrl={item.other.imageUrl} userName={item.other.name} time={item?.lastMessage?.sendedAt} lastChat={item?.lastMessage?.message} unread={item.unread} />
  ));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle('채팅'));

    getChatList(1, setChatList);

    return () => {
      // second
    };
  }, [dispatch, getChatList]);

  return (
    <Wrapper>
      {ChatListShow}
      <button onClick={() => makeChatRoom(1, 2)}>채팅 하기</button>
    </Wrapper>
  );
};

export default ChatPage;
