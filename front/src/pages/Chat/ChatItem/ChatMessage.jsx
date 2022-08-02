import React, { useEffect, useState } from 'react';
import style from './ChatMessage.style';

const ChatMessage = ({ side, item }) => {
  const { Wrapper, Left, Right } = style;
  const { message, sendedAt } = item;
  const [koreanTime, setKoreanTime] = useState();

  useEffect(() => {
    if (sendedAt) {
      const d = new Date(sendedAt);
      setKoreanTime(d.toLocaleTimeString('ko-kr', { hour: '2-digit', minute: '2-digit' }));
    }
  }, [sendedAt]);

  return (
    <Wrapper>
      {side === 'left' ? (
        <Left>
          <msg>{message}</msg>
          {sendedAt && koreanTime}
        </Left>
      ) : (
        <Right>
          {sendedAt && koreanTime}
          <msg>{message}</msg>
        </Right>
      )}
    </Wrapper>
  );
};

export default ChatMessage;
