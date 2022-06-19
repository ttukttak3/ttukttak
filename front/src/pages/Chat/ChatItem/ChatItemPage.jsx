/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setTitle, setBack, setAlert } from '../../../app/headerSlice';
import ChatBookInfo from './ChatBookInfo';
import ChatFooter from './ChatFooter';
import * as StompJs from '@stomp/stompjs';
import * as SockJs from 'sockjs-client';
import ChatMessage from './ChatMessage';
import axios from 'axios';
import style from './ChatItemPage.style';

const ChatItemPage = () => {
  const { roomId } = useParams();
  const { Wrapper } = style;
  const dispatch = useDispatch();
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const baseUrl = 'http://localhost:8080/';
  const client = useRef({});

  useEffect(() => {
    //chatting 방 정보 api
    dispatch(setTitle('대화자이름!'));
    dispatch(setBack(true));
    dispatch(setAlert(true));

    connect();

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

  //1. stomp.client 객체 만들기
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJs(baseUrl + 'ws-stomp'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: err => {
        console.error(err);
      },
    });
    //2. client.activate;
    client.current.activate();
  };

  //3. client.subscribe 함수 : 메세지 보내기
  const subscribe = () => {
    client.current.subscribe(`/chat/message/${roomId}`, ({ body }) => {
      setChatMessages(_chatMessages => [..._chatMessages, JSON.parse(body)]);
    });
    setMessage('');
  };

  //4. client.publish 함수 : 메세지 받기
  const publish = message => {
    if (!client.current.connected) {
      return;
    }
    client.current.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify({
        roomId: roomId,
        userId: 1,
        message: message,
        messageType: 'TEXT',
      }),
    });
    setMessage('');
  };

  return (
    <Wrapper>
      <ChatBookInfo></ChatBookInfo>
      <div>{roomId}</div>
      {/* <ChatMessage side={'left'} message={'안녕'}></ChatMessage>
      <ChatMessage side={'right'} message={'안녕하세요'}></ChatMessage> */}
      {chatMessages.map((item, idx) => (
        <>{userId === 1 ? <ChatMessage side={'right'} message={item.message}></ChatMessage> : <ChatMessage side={'left'} message={item.message}></ChatMessage>}</>
      ))}
      {/* 메세지 받은거 추가추가추가,,,
      {chatMessages.map()} */}
      <ChatFooter message={message} publish={publish} setMessage={setMessage}></ChatFooter>
    </Wrapper>
  );
};

export default ChatItemPage;
