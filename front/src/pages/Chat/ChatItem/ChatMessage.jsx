import React from 'react';
import style from './ChatMessage.style';

const ChatMessage = ({ side, message }) => {
  const { Wrapper, Left, Right } = style;
  return <Wrapper>{side === 'left' ? <Left>{message}</Left> : <Right>{message}</Right>}</Wrapper>;
};

export default ChatMessage;
