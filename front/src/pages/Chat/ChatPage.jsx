import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ChatListItem from './ChatListItem';
import Wrapper from './ChatPage.style';

const ChatPage = () => {
  const [chatList, setChatList] = useState([
    { id: 124123, userName: '홍길동', time: '어제', lastChat: 'djfksjfk', unread: 2 },
    { id: 124123, userName: '강소연', time: '오전 5:32', lastChat: 'djfksjfk', unread: 2 },
    { id: 124123, userName: '김민정', time: '2022년 5월 31일', lastChat: 'djfksjfk', unread: 2 },
  ]);

  const ChatListShow = chatList.map((item, idx) => <ChatListItem id={idx} imgUrl={item.imgUrl} userName={item.userName} time={item.time} lastChat={item.lastChat} unread={item.unread} />);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Wrapper>
      ChattingPage
      {ChatListShow}
    </Wrapper>
  );
};

export default ChatPage;
