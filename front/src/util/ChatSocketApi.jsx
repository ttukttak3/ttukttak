import * as StompJs from '@stomp/stompjs';
import * as SockJs from 'sockjs-client';

// const baseUrl = 'http://localhost:8080/';

const baseUrl = 'http://101.101.219.43:8080/';
//1. stomp.client 객체 만들기
const connect = client => {
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
const subscribe = (client, setChatMessages, setMessage) => {
  console.log('subscribe function');
  client.current.subscribe(`/chat/message/${roomId}`, ({ body }) => {
    //여기서 메세지 읽음 처리--> readMessages 감
    setChatMessages(_chatMessages => [..._chatMessages, JSON.parse(body)]);
  });
  setMessage('');
};

//4. client.publish 함수 : 메세지 받기
const publish = (roomId, userId, client, setMessage, message) => {
  if (!client.current.connected) {
    return;
  }
  client.current.publish({
    destination: '/pub/chat/message',
    body: JSON.stringify({
      roomId: roomId,
      userId: userId,
      message: message,
      messageType: 'TEXT',
    }),
  });
  setMessage('');
};

const chatSocketApi = { connect, publish };

export default chatSocketApi;
