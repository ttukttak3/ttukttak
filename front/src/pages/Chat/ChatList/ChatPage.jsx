/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle, setAllFalse } from '../../../app/headerSlice';
import ChatListItem from '../ChatList/ChatListItem';
import style from '../ChatList/ChatPage.style';
import messageApi from '../../../util/MessageApi';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const [chatList, setChatList] = useState([]);
  const { userId } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { getChatList } = messageApi;
  const { Wrapper, NoItem } = style;

  const ChatListShow = chatList
    .filter(chat => chat.lastMessage !== null)
    .sort((a, b) => {
      const firstTime = new Date(a?.lastMessage?.sendedAt);
      const secondTime = new Date(b?.lastMessage?.sendedAt);
      return secondTime - firstTime;
    })
    .map((item, idx) => (
      <ChatListItem
        key={idx}
        id={item.roomId}
        imgUrl={item?.another?.imageUrl}
        userName={item.another.nickname}
        time={item?.lastMessage?.sendedAt}
        lastChat={item?.lastMessage?.message}
        unread={item.unread}
      />
    ));

  useEffect(() => {
    //로그인 back history
    localStorage.setItem('url', '/chat');
    dispatch(setAllFalse());
    dispatch(setTitle('채팅'));
    getChatList(userId, setChatList);
  }, [dispatch, getChatList, userId]);

  return <Wrapper>{ChatListShow.length > 0 ? ChatListShow : <NoItem>우리 주변 이웃의 책을 대여해보세요.</NoItem>}</Wrapper>;
};

export default ChatPage;
