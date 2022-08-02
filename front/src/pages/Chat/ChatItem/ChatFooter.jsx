import React from 'react';
import style from './ChatFooter.style';
import send from '../../../assets/img/userInterFace/send.png';
import add from '../../../assets/img/arrows/Add.png';
import chatSocketApi from '../../../util/ChatSocketApi';

const ChatFooter = ({ roomId, memberId, message, client, setMessage }) => {
  const { Input, Wrapper, AddBtn, SendBtn } = style;
  const { publish } = chatSocketApi;

  const sendMessageHandler = () => {
    if (message.trim().length > 0) {
      publish(roomId, memberId, client, message);
      setMessage('');
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendMessageHandler();
    }
  };

  return (
    <Wrapper>
      <AddBtn src={add}></AddBtn>
      <Input type={'text'} placeholder={'메시지를 입력해 주세요.'} value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => handleKeyPress(e)}></Input>
      <SendBtn src={send} onClick={() => sendMessageHandler()}></SendBtn>
    </Wrapper>
  );
};

export default ChatFooter;
