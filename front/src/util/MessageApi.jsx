/* eslint-disable array-callback-return */
import axios from 'axios';
<<<<<<< HEAD
// const baseUrl = 'http://localhost:8080/';
const baseUrl = 'http://101.101.219.43:8080/';
=======
const baseUrl = 'http://localhost:8080/';
// const baseUrl = 'http://localhost:8080/api';
>>>>>>> 498d3327d226387f80f8b5b01c16c55133d7a52f

//userId == 현재 login되어있는 user의 id

//GET
const getChatRoomInfo = async (roomId, setChatMessages, setMembers) => {
  console.log('getMessageList');

  try {
<<<<<<< HEAD
    const result = await axios.get(baseUrl + `api/chat/messages/${roomId}`);
=======
    // const result = await axios.get(baseUrl + `chat/messages/${roomId}`);
    const result = await axios.get(baseUrl + `messages/${roomId}`);
>>>>>>> 498d3327d226387f80f8b5b01c16c55133d7a52f
    const data = result.data;
    setMembers(data.members);
    data.messages.map(data => {
      console.log(data);
      setChatMessages(_chatList => [..._chatList, data]);
    });

    return;
  } catch (error) {
    console.log(error);
  }
};

//GET
const getChatList = async (userId, setChatList) => {
  try {
<<<<<<< HEAD
    const result = await axios.get(baseUrl + `api/chat/rooms/${userId}`);
=======
    // const result = await axios.get(baseUrl + `chat/rooms/${userId}`);
    const result = await axios.get(baseUrl + `rooms/${userId}`);
>>>>>>> 498d3327d226387f80f8b5b01c16c55133d7a52f
    result.data.map(data => {
      setChatList(_chatList => [..._chatList, data]);
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

//POST
const makeChatRoom = async (bookId, userId) => {
  try {
<<<<<<< HEAD
    const result = await axios.post(baseUrl + `api/chat/rooms/`, { bookId: 1, userId: 2 });
=======
    // const result = await axios.post(baseUrl + `chat/rooms`, { bookId: bookId, userId: userId });
    const result = await axios.post(baseUrl + `rooms`, { bookId: bookId, userId: userId });
>>>>>>> 498d3327d226387f80f8b5b01c16c55133d7a52f
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

//PUT
const readMessages = async (messageId, userId, roomId) => {
  try {
<<<<<<< HEAD
    const result = await axios.put(baseUrl + `api/chat/messages/last-checked`, {
=======
    // const result = await axios.put(baseUrl + `chat/messages/last-checked`, {
    const result = await axios.put(baseUrl + `messages/last-checked`, {
>>>>>>> 498d3327d226387f80f8b5b01c16c55133d7a52f
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
