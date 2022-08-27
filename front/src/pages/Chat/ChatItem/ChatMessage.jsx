import React, { useEffect, useState } from 'react';
import style from './ChatMessage.style';

const ChatMessage = ({ side, item }) => {
  const { Message } = style;
  const { message, sendedAt } = item;
  const [koreanTime, setKoreanTime] = useState();

  useEffect(() => {
    if (sendedAt) {
      const d = new Date(sendedAt);
      setKoreanTime(d.toLocaleTimeString('ko-kr', { hour: '2-digit', minute: '2-digit' }));
    }
  }, [sendedAt]);

  return (
    <Message className={side}>
      <p>{message}</p>
      <span>{sendedAt && koreanTime}</span>
    </Message>
  );
};

export default ChatMessage;
