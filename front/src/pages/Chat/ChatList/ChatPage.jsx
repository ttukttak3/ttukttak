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

  const { getChatList } = messageApi;

  const ChatListShow = chatList.map((item, idx) => (
    <ChatListItem id={item.roomId} imgUrl={item.other.imageUrl} userName={item.other.name} time={item?.lastMessage?.sendedAt} lastChat={item?.lastMessage?.message} unread={item.unread} />
  ));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle('채팅'));
    console.log(userId);
    getChatList(userId, setChatList);

    return () => {
      // second
    };
  }, [dispatch, getChatList, userId]);

  return <Wrapper>{ChatListShow}</Wrapper>;
};

export default ChatPage;
