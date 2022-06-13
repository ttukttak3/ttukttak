import React from 'react';
import style from './ChatFooter.style';
import send from '../../../assets/img/userInterFace/send.png';
import add from '../../../assets/img/arrows/Add.png';

const ChatFooter = ({ message, setMessage, publish }) => {
  const { Input, Wrapper, AddBtn, SendBtn } = style;

  return (
    <Wrapper>
      <AddBtn src={add}></AddBtn>
      <Input type={'text'} placeholder={'메시지를 입력해 주세요.'} value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.which === 13 && publish(message)}></Input>
      <SendBtn src={send}></SendBtn>
    </Wrapper>
  );
};

export default ChatFooter;
