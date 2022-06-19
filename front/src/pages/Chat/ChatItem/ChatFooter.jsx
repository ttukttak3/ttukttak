import React, { useDeferredValue } from 'react';
import style from './ChatFooter.style';
import send from '../../../assets/img/userInterFace/send.png';
import add from '../../../assets/img/arrows/Add.png';
import { useSelector } from 'react-redux';

const ChatFooter = ({ roomId, message, client, setMessage, publish }) => {
  const { Input, Wrapper, AddBtn, SendBtn } = style;
  const { userId } = useSelector(state => state.user);

  return (
    <Wrapper>
      <AddBtn src={add}></AddBtn>
      <Input
        type={'text'}
        placeholder={'메시지를 입력해 주세요.'}
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.which === 13 && publish(roomId, userId, client, message, setMessage)}
      ></Input>
      <SendBtn src={send} onClick={publish(roomId, userId, client, message, setMessage)}></SendBtn>
    </Wrapper>
  );
};

export default ChatFooter;
