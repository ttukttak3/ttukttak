/* eslint-disable array-callback-return */
import axios from 'axios';

// const baseUrl = 'http://localhost:8080/';
const baseUrl = 'http://localhost:8080/';

// const baseUrl = 'http://localhost:8080/';
// const baseUrl = 'http://localhost:8080/api';

//userId == 현재 login되어있는 user의 id

//GET
const getChatRoomInfo = async (roomId, setChatMessages, setMembers) => {
  console.log('getMessageList');

  try {
    const result = await axios.get(baseUrl + `api/chat/messages/${roomId}`);

    // const result = await axios.get(baseUrl + `chat/messages/${roomId}`);
    // const result = await axios.get(baseUrl + `messages/${roomId}`);
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
    const result = await axios.get(baseUrl + `api/chat/rooms/${userId}`);
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
    const result = await axios.post(baseUrl + `api/chat/rooms`, { bookId: 1, userId: 2 });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

//PUT
const readMessages = async (messageId, userId, roomId) => {
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
