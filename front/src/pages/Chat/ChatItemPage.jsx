import React from 'react';
import { useParams } from 'react-router-dom';

const ChatItemPage = () => {
  const { chatId } = useParams();

  return (
    <>
      <div>ChatItemPage</div>
      <div>{chatId}</div>
    </>
  );
};

export default ChatItemPage;
