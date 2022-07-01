/* eslint-disable array-callback-return */
import axios from 'axios';
// const baseUrl = 'http://localhost:8080/';
const baseUrl = 'http://101.101.219.43:8080/';

//userId == 현재 login되어있는 user의 id

const getChatRoomInfo = async (roomId, setChatMessages, setMembers) => {
  //여태까지 message chatMessages에 저장하기
  //messages/{roomId} GET
  console.log('getMessageList');
  //return 값 : {roomId, members, messages}
  //members : [ {
  //   id : 1
  //   imageUrl: 'http://www.w3bai.com/css/img_fjords.jpg',
  //   name: '홍길동',
  // }, {
  //   id : 1
  //   imageUrl: 'http://www.w3bai.com/css/img_fjords.jpg',
  //   name: '홍길동',
  // }]

  try {
    const result = await axios.get(baseUrl + `api/chat/messages/${roomId}`);
    const data = result.data;
    setMembers(data.members);
    data.messages.map(data => {
      console.log(data);
      setChatMessages(_chatList => [..._chatList, data]);
    });
  } catch (error) {
    console.log(error);
  }
};

const getChatList = async (userId, setChatList) => {
  try {
    const result = await axios.get(baseUrl + `api/chat/rooms/${userId}`);
    result.data.map(data => {
      console.log(data);
      setChatList(_chatList => [..._chatList, data]);
    });
  } catch (error) {
    console.log(error);
  }
};

const makeChatRoom = async (bookId, userId) => {
  try {
    const result = await axios.post(baseUrl + `api/chat/rooms/`, { bookId: 1, userId: 2 });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

//메세지 읽음 함수
const readMessages = async (messageId, userId, roomId) => {
  //   /message/lastChecked PUT
  // {messageId, userId, roomId}
  try {
    const result = await axios.put(baseUrl + `api/chat/messages/last-checked`, {
      messageId: messageId,
      userId: userId,
      roomId: roomId,
    });
  } catch (error) {
    console.log(error);
  }
};

const messageApi = { getChatRoomInfo, getChatList, makeChatRoom, readMessages };

export default messageApi;
