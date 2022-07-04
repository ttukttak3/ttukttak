import * as StompJs from '@stomp/stompjs';
import * as SockJs from 'sockjs-client';

const baseUrl = process.env.REACT_APP_API_URL;

//1. stomp.client 객체 만들기
const connect = (client, roomId, setChatMessages, setMessage) => {
  client.current = new StompJs.Client({
    webSocketFactory: () => new SockJs(baseUrl + 'ws-stomp'),
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log('connect: onConnect');
      subscribe(client, roomId, setChatMessages, setMessage);
    },
    onStompError: err => {
      console.error(err);
    },
  });
  //2. client.activate;
  client.current.activate();
};

//3. client.subscribe 함수 : 메세지 받기
const subscribe = (client, roomId, setChatMessages, setMessage) => {
  console.log('subscribe function');
  client.current.subscribe(`/sub/chat/room/${roomId}`, ({ body }) => {
    //여기서 메세지 읽음 처리--> readMessages 감
    console.log('client: subscribe');
    setChatMessages(_chatMessages => [..._chatMessages, JSON.parse(body)]);
  });
  // setMessage('');
};

//4. client.publish 함수 : 메세지 보내기
const publish = (roomId, userId, client, setMessage, message) => {
  console.log('publish');
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
  // setMessage('');
};

const chatSocketApi = { connect, publish };

export default chatSocketApi;
