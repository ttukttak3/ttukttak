/* eslint-disable array-callback-return */
import utils from './ApiUtil';
const { apiAuthUtil } = utils;

const getChatRoomInfo = async (roomId, setChatMessages, setMembers) => {
  console.log('getMessageList');

  try {
    const result = await apiAuthUtil.get(`api/v1/chat/rooms/${roomId}/messages`);
    const data = result.data;

    data.members.map(data => {
      setMembers(_memberList => [..._memberList, data]);
    });

    data.messages.map(data => {
      setChatMessages(_chatList => [..._chatList, data]);
    });
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getChatList = async (userId, setChatList) => {
  console.log('getChatList');
  try {
    const result = await apiAuthUtil.get(`api/v1/users/${userId}/chat/rooms`);
    result.data.map(data => {
      setChatList(_chatList => [..._chatList, data]);
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const makeChatRoom = async (bookId, userId) => {
  console.log(bookId, userId);
  try {
    const result = await apiAuthUtil.post(`api/v1/chat/rooms`, { bookId, userId });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const readMessages = async (messageId, memberId, roomId) => {
  console.log(`last-checked: ${messageId}, ${memberId}, ${roomId}`);
  try {
    const result = await apiAuthUtil.patch(`api/v1/chat/members/${memberId}/last-checked`, {
      messageId: messageId,
      roomId: roomId,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const chatRoomOut = async memberId => {
  try {
    const result = await apiAuthUtil.delete(`api/v1/chat/members/${memberId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const messageApi = { getChatRoomInfo, getChatList, makeChatRoom, readMessages, chatRoomOut };

export default messageApi;
