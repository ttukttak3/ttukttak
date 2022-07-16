/* eslint-disable array-callback-return */
import axios from 'axios';
const baseUrl = process.env.REACT_APP_SERVER_API_URL;

//userId == 현재 login되어있는 user의 id
const getChatRoomInfo = async (roomId, setChatMessages, setMembers) => {
  console.log('getMessageList');

  try {
    const result = await axios.get(baseUrl + `api/v1/chat/messages/${roomId}`);
    const data = result.data;

    data.members.map(data => {
      setMembers(_memberList => [..._memberList, data]);
    });

    data.messages.map(data => {
      setChatMessages(_chatList => [..._chatList, data]);
    });

    return;
  } catch (error) {
    console.log(error);
  }
};

const getChatList = async (userId, setChatList) => {
  console.log('getChatList');
  try {
    const result = await axios.get(baseUrl + `api/v1/chat/rooms/${userId}`);
    result.data.map(data => {
      setChatList(_chatList => [..._chatList, data]);
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const makeChatRoom = async (bookId, userId) => {
  try {
    const result = await axios.post(baseUrl + `api/v1/chat/rooms`, { bookId: bookId, userId: userId });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

const readMessages = async (messageId, userId, roomId) => {
  try {
    const result = await axios.patch(baseUrl + `api/v1/chat/messages/last-checked`, {
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
