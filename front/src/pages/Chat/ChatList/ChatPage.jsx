import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle, setBack } from '../../../app/headerSlice';
import ChatListItem from '../ChatList/ChatListItem';
import Wrapper from '../ChatList/ChatPage.style';
import axios from 'axios';

const ChatPage = () => {
  let baseUrl = 'http://localhost:8080/';

  const [chatList, setChatList] = useState([]);

  const ChatListShow = chatList.map((item, idx) => (
    <ChatListItem id={item.roomId} imgUrl={item.other.imageUrl} userName={item.other.name} time={item?.lastMessage?.sendedAt} lastChat={item?.lastMessage?.message} unread={item.unread} />
  ));
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
