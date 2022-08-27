import React from 'react';
import style from './ChatFooter.style';
import send from '../../../assets/img/userInterFace/send.png';
import add from '../../../assets/img/arrows/Add.png';
import chatSocketApi from '../../../util/ChatSocketApi';

const ChatFooter = ({ roomId, memberId, message, client, setMessage }) => {
  const { Wrapper, AddBtn, SendBtn } = style;
  const { publish } = chatSocketApi;

  const sendMessageHandler = () => {
    if (message.trim().length > 0) {
      publish(roomId, memberId, client, message);
      setMessage('');
    }
  };

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      if (!e.shiftKey) {
        sendMessageHandler();
      }
    }
  };

  return (
    <Wrapper>
      <AddBtn src={add}></AddBtn>
      <textarea placeholder={'메시지를 입력해 주세요.'} onChange={e => setMessage(e.target.value)} onKeyUp={handleKeyUp} value={message} />
      <SendBtn onClick={() => sendMessageHandler()}>
        <img src={send} alt="이미지" />
      </SendBtn>
    </Wrapper>
  );
};

export default ChatFooter;
