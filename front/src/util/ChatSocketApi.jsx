import * as StompJs from '@stomp/stompjs';
import * as SockJs from 'sockjs-client';

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

//1. stomp.client 객체 만들기
const connect = (client, roomId, setChatMessages) => {
  client.current = new StompJs.Client({
    webSocketFactory: () => new SockJs(baseUrl + 'api/ws-stomp'),
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log('connect: onConnect');
      subscribe(client, roomId, setChatMessages);
    },
    onStompError: err => {
      console.error(err);
    },
  });
  //2. client.activate;
  client.current.activate();
};

//3. client.subscribe 함수 : 메세지 받기
const subscribe = (client, roomId, setChatMessages) => {
  console.log('subscribe function');
  console.log(roomId);
  client.current.subscribe(`/api/sub/chat/room/${roomId}`, ({ body }) => {
    //여기서 메세지 읽음 처리--> readMessages 감
    console.log('client: subscribe');
    setChatMessages(_chatMessages => [..._chatMessages, JSON.parse(body)]);
  });
};

//4. client.publish 함수 : 메세지 보내기
const publish = (roomId, memberId, client, message) => {
  console.log(`publish : ${roomId}, ${memberId}, ${client}, ${message}`);
  if (!client.current.connected) {
    return;
  }
  client.current.publish({
    destination: '/api/pub/chat/message',
    body: JSON.stringify({
      roomId: roomId,
      memberId: memberId,
      message: message,
      messageType: 'TEXT',
    }),
  });
};

const chatSocketApi = { connect, publish };

export default chatSocketApi;
