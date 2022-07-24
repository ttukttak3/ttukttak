/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle, setAllFalse } from '../../../app/headerSlice';
import ChatListItem from '../ChatList/ChatListItem';
import Wrapper from '../ChatList/ChatPage.style';
import messageApi from '../../../util/MessageApi';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const [chatList, setChatList] = useState([]);
  const { userId } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { getChatList } = messageApi;

  const ChatListShow = chatList.map((item, idx) => (
    <ChatListItem id={item.roomId} imgUrl={item.another.imageUrl} userName={item.another.nickname} time={item?.lastMessage?.sendedAt} lastChat={item?.lastMessage?.message} unread={item.unread} />
  ));

  useEffect(() => {
    //로그인 back history
    localStorage.setItem('url', '/chat');
    dispatch(setAllFalse());
    dispatch(setTitle('채팅'));
    getChatList(userId, setChatList);
  }, [dispatch, getChatList, userId]);

  return <Wrapper>{ChatListShow}</Wrapper>;
};

export default ChatPage;
