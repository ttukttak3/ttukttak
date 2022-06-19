import axios from 'axios';

const baseUrl = 'http://localhost:8080/';

const getMessageList = async (roomId, setChatMessages) => {
  //여태까지 message chatMessages에 저장하기
  //messages/{roomId} GET
  console.log('getMessageList');
  try {
    const result = await axios.get(baseUrl + `messages/${roomId}`);
    result.data.map(data => {
      console.log(data);
      setChatMessages(_chatList => [..._chatList, data]);
    });
  } catch (error) {
    console.log(error);
  }
};

const getChatList = async (userId, setChatList) => {
  try {
    const result = await axios.get(baseUrl + `chat/rooms/${userId}`);
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
    const result = await axios.post(baseUrl + `chat/room/`, { bookId: 1, userId: 2 });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

const messageApi = { getMessageList, getChatList, makeChatRoom };

export default messageApi;
