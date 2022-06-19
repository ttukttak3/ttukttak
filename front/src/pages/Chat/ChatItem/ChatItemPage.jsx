/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setTitle, setBack, setAlert } from '../../../app/headerSlice';
import ChatBookInfo from './ChatBookInfo';
import ChatFooter from './ChatFooter';
import chatSocketApi from '../../../util/ChatSocketApi';
import ChatMessage from './ChatMessage';
import axios from 'axios';
import style from './ChatItemPage.style';

const ChatItemPage = () => {
  const { roomId } = useParams();
  const { Wrapper } = style;
  const dispatch = useDispatch();

  const { connect, publish } = chatSocketApi;
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const baseUrl = 'http://localhost:8080/';
  const client = useRef({});

  useEffect(() => {
    //chatting 방 정보 api
    dispatch(setTitle('대화자이름!'));
    dispatch(setBack(true));
    dispatch(setAlert(true));

    connect(client);

    //여태까지 message chatMessages에 저장하기
    //messages/{roomId} GET
    axios.get(baseUrl + `messages/${roomId}`).then(res => {
      console.log(res.data);
      res.data.map(data => {
        console.log(data);
        chatMessages(_chatList => [..._chatList, data]);
      });
    });

    return () => {
      //final. client deactivate
      client.current.deactivate();
    };
  }, []);

  return (
    <Wrapper>
      <ChatBookInfo></ChatBookInfo>
      <div>{roomId}</div>
      {/* <ChatMessage side={'left'} message={'안녕'}></ChatMessage>
      <ChatMessage side={'right'} message={'안녕하세요'}></ChatMessage> */}
      {chatMessages.map((item, idx) => (
        <>{userId === 1 ? <ChatMessage side={'right'} message={item.message}></ChatMessage> : <ChatMessage side={'left'} message={item.message}></ChatMessage>}</>
      ))}
      <ChatFooter message={message} client={client} publish={publish} setMessage={setMessage}></ChatFooter>
    </Wrapper>
  );
};

export default ChatItemPage;
