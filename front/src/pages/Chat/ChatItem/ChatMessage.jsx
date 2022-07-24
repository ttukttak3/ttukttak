import React from 'react';
import style from './ChatMessage.style';

const ChatMessage = ({ side, item }) => {
  const { Wrapper, Left, Right } = style;
  const { message, sendedAt } = item;

  const d = new Date(sendedAt);

  return (
    <Wrapper>
      {side === 'left' ? (
        <Left>
          <msg>{message}</msg>
          {d.toLocaleTimeString('ko-kr')}
        </Left>
      ) : (
        <Right>
          {d.toLocaleTimeString('ko-kr')}
          <msg>{message}</msg>
        </Right>
      )}
    </Wrapper>
  );
};

export default ChatMessage;
