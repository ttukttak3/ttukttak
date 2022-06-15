import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle, setBack } from '../../../app/headerSlice';
import ChatListItem from '../ChatList/ChatListItem';
import Wrapper from '../ChatList/ChatPage.style';
import axios from 'axios';

const ChatPage = () => {
  let baseUrl = 'http://localhost:8080/';

  const [chatList, setChatList] = useState([
    { id: 124123, userName: '홍길동', time: '어제', lastChat: 'djfksjfk', unread: 2 },
    { id: 124123, userName: '강소연', time: '오전 5:32', lastChat: 'djfksjfk', unread: 2 },
    { id: 124123, userName: '김민정', time: '2022년 5월 31일', lastChat: 'djfksjfk', unread: 2 },
  ]);

  const ChatListShow = chatList.map((item, idx) => <ChatListItem id={idx} imgUrl={item.imgUrl} userName={item.userName} time={item.time} lastChat={item.lastChat} unread={item.unread} />);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('채팅'));
    dispatch(setBack(false));

    // userId가 참여하고 있는 채팅 리스트 가져오기
    // chat/rooms/{userId} GET
    axios.get(baseUrl + `chat/rooms/1`).then(res => {
      console.log(res.data);
      res.data.map(data => {
        console.log(data);
        setChatList(_chatList => [..._chatList, data]);
      });
    });

    return () => {
      // second
    };
  }, []);

  const makeroom = () => {
    axios.post(baseUrl + `chat/room/`, { bookId: 1, userId: 2 }).then(res => {
      console.log(res.data);
    });
  };

  return (
    <Wrapper>
      {ChatListShow}
      <button onClick={makeroom}>채팅 생성</button>
    </Wrapper>
  );
};

export default ChatPage;
