import React from 'react';
import style from './ChatMessage.style';

const ChatMessage = ({ side, item }) => {
  const { Wrapper, Left, Right } = style;
  const { message, sendedAt } = item;
  return (
    <Wrapper>
      {side === 'left' ? (
        <Left>
          {message} <time>{sendedAt}</time>
        </Left>
      ) : (
        <Right>
          {message} <time>{sendedAt}</time>
        </Right>
      )}
    </Wrapper>
  );
};

export default ChatMessage;
