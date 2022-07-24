import React from 'react';
import style from './ChatFooter.style';
import send from '../../../assets/img/userInterFace/send.png';
import add from '../../../assets/img/arrows/Add.png';
import { useSelector } from 'react-redux';
import chatSocketApi from '../../../util/ChatSocketApi';

const ChatFooter = ({ roomId, memberId, message, client, setMessage }) => {
  const { Input, Wrapper, AddBtn, SendBtn } = style;
  const { publish } = chatSocketApi;

  const sendMessageHandler = () => {
    publish(roomId, memberId, client, message);
    setMessage('');
  };

  return (
    <Wrapper>
      <AddBtn src={add}></AddBtn>
      <Input type={'text'} placeholder={'메시지를 입력해 주세요.'} value={message} onChange={e => setMessage(e.target.value)}></Input>
      <SendBtn src={send} onClick={() => sendMessageHandler()}></SendBtn>
    </Wrapper>
  );
};

export default ChatFooter;
