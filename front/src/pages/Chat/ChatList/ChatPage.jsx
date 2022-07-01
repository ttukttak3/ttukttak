/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle, setBack } from '../../../app/headerSlice';
import ChatListItem from '../ChatList/ChatListItem';
import Wrapper from '../ChatList/ChatPage.style';
import messageApi from '../../../util/MessageApi';
const ChatPage = () => {
  const [chatList, setChatList] = useState([
    {
      roomId: 1,
      other: {
        imageUrl: 'http://www.w3bai.com/css/img_fjords.jpg',
        name: '홍길동',
      },
      lastMessage: {
        sendedAt: 124325,
        message: '이거 대여 가능한가요?',
      },
      unread: true,
    },
  ]);

  const { getChatList, makeChatRoom } = messageApi;

  const ChatListShow = chatList.map((item, idx) => (
    <ChatListItem id={item.roomId} imgUrl={item.other.imageUrl} userName={item.other.name} time={item?.lastMessage?.sendedAt} lastChat={item?.lastMessage?.message} unread={item.unread} />
  ));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('채팅'));
    dispatch(setBack(false));

    // userId가 참여하고 있는 채팅 리스트 가져오기
    // chat/rooms/{userId} GET
    getChatList(1, setChatList);

    return () => {
      // second
    };
  }, []);

  return (
    <Wrapper>
      {ChatListShow}
      <button onClick={() => makeChatRoom(1, 2)}>채팅 하기</button>
    </Wrapper>
  );
};

export default ChatPage;
