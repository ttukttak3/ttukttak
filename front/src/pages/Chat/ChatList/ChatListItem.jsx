import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './ChatListItem.style';
import noneUserIcon from '../../../assets/img/userInterFace/userNone.png';
import noImg from '../../../assets/img/logo/homeb_default.svg';

const ChatListItem = ({ id, imgUrl, userName, time, lastChat, unread }) => {
  const { Wrapper, Img, UserName, LastChat, InfoWrapper } = style;
  const navigate = useNavigate();
  const d = new Date(time);
  return (
    <Wrapper key={id} onClick={() => navigate(`/chat/${id}`)}>
      <Img src={imgUrl} onError={noImg} />
      <InfoWrapper>
        <UserName>
          <p>{userName}</p>
          <span>{d.toLocaleTimeString('ko-kr', { hour: '2-digit', minute: '2-digit' })}</span>
        </UserName>
        <LastChat>
          <p>{lastChat}</p>
          {unread > 0 && <span>{unread}</span>}
        </LastChat>
      </InfoWrapper>
    </Wrapper>
  );
};

ChatListItem.defaultProps = {
  id: 1212432,
  imgUrl: noneUserIcon,
  userName: 'name',
  time: '2020.05.31',
  lastChat: '',
  unread: 32,
};

ChatListItem.propTypes = {
  id: PropTypes.bigint,
  imgUrl: PropTypes.string,
  userName: PropTypes.string,
  time: PropTypes.string,
  lastChat: PropTypes.string,
  unread: PropTypes.number,
};

export default ChatListItem;
