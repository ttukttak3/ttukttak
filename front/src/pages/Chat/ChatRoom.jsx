import * as React from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import * as SockJs from 'sockjs-client';

// eslint-disable-next-line max-lines-per-function
const ChatRoom = () => {
  // let baseUrl = 'chatting-app-dev:8080/';
  const baseUrl = 'http://101.101.219.43:8080/';
  const [post, setPost] = React.useState(null);
  let { roomId } = useParams();
  let navigate = useNavigate();

  const onReservationHandler = () => {
    console.log('예약하기 버튼 click');
    navigate('/chatting/reservation/' + roomId);
  };

  // chatting
  const client = React.useRef({});
  const [chatMessages, setChatMessages] = React.useState([]);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    connect();

    axios
      // .get("http://localhost:8083/reservation", {
      .get(baseUrl + 'reservation', {
        params: {
          sellerId: 123,
          buyerId: 345,
          chatRoomId: roomId,
        },
      })
      .then(res => {
        setPost(res.data);
        console.log(res.data);
        console.log(res.data.status);
        console.log('실행');
      });

    // axios.get(`http://localhost:8083/message/${room_id}`).then((res) => {
    axios.get(baseUrl + `message/${roomId}`).then(res => {
      setChatMessages(() => []);
      res.data.map(data => {
        console.log(data.message);
        setChatMessages(_chatMessages => [..._chatMessages, data]);
      });
    });

    return () => disconnect();
  }, []);

  //stomp로 client 객체 만들기
  const connect = () => {
    client.current = new StompJs.Client({
      // webSocketFactory: () => new SockJs("http://localhost:8083/ws-stomp"),
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
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/${room_id}`, ({ body }) => {
      setChatMessages(_chatMessages => [..._chatMessages, JSON.parse(body)]);
    });
    // client.current.publish({
    //   destination: '/pub/chat/message',
    //   body: JSON.stringify({
    //     type: 'ENTER',
    //     roomId: room_id,
    //     sender: '지현이',
    //   }),
    // });
    setMessage('');
  };

  const publish = message => {
    console.log(message);
    if (!client.current.connected) {
      return;
    }
    client.current.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify({
        type: 'TALK',
        roomId: roomId,
        sender: '지현이',
        message: message,
      }),
    });
    setMessage('');
  };

  return (
    <>
      <h2>방 아이디 : {roomId}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50vh',
        }}
      >
        <div>
          {chatMessages && chatMessages.length > 0 && (
            <ul>
              {chatMessages.map((_chatMessage, index) => (
                <li key={index}>
                  {_chatMessage.sender} : {_chatMessage.message}
                </li>
              ))}
            </ul>
          )}
          <div>
            <input type={'text'} placeholder={'message'} value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.which === 13 && publish(message)} />
            <button onClick={() => publish(message)}>send</button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <button>
          <Link to="/chatting">HOME</Link>
        </button>
        {post == '' ? <button onClick={onReservationHandler}>예약하기</button> : <button onClick={onCancelHandler}>예약취소하기</button>}
      </div>
    </>
  );
};

export default ChatRoom;
