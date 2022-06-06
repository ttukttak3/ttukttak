import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './ChatListItem.style';
import noneUserIcon from '../../assets/img/userInterFace/userNone.png';

const ChatListItem = ({ id, imgUrl, userName, time, lastChat, unread }) => {
  const { Wrapper, Img, UserName, Time, LastChat, Unread } = style;
  const navigate = useNavigate();
  return (
    <Wrapper key={id} onClick={() => navigate(`/chat/${id}`)}>
      <Img src={imgUrl} />
      <UserName>{userName}</UserName>
      <Time>{time}</Time>
      <LastChat>{lastChat}</LastChat>
      <Unread>{unread}</Unread>
    </Wrapper>
  );
};

ChatListItem.defaultProps = {
  id: 1212432,
  imgUrl: noneUserIcon,
  userName: 'name',
  time: '2020.05.31',
  lastChat: '안녕하세요, 구매 문의할 수 있을까요?',
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
