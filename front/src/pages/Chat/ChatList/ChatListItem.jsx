import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './ChatListItem.style';
import noneUserIcon from '../../../assets/img/userInterFace/userNone.png';
import noImg from '../../../assets/img/logo/homeb_default.svg';

const ChatListItem = ({ id, imgUrl, userName, time, lastChat, unread }) => {
  const { Wrapper, ImgBox, UserName, LastChat, InfoWrapper } = style;
  const navigate = useNavigate();
  const d = new Date(time);
  const onErrorImg = e => {
    e.target.src = noImg;
  };
  //unread = 100;
  return (
    <Wrapper key={id} onClick={() => navigate(`/chat/room`, { state: { id: id } })}>
      <ImgBox>
        <img src={imgUrl === null ? '' : imgUrl} onError={onErrorImg} alt="프로필이미지" />
      </ImgBox>
      <InfoWrapper>
        <UserName>
          <p className={userName === null ? 'unknown' : ''}>{userName === null ? '(탈퇴한 회원)' : userName}</p>
          <span>{d.toLocaleTimeString('ko-kr', { hour: '2-digit', minute: '2-digit' })}</span>
        </UserName>
        <LastChat>
          <p>{lastChat}</p>
          {unread > 0 && <span className={unread > 99 ? 'highest' : unread > 9 ? 'higher' : ''}>{unread}</span>}
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
  id: PropTypes.number,
  imgUrl: PropTypes.string,
  userName: PropTypes.string,
  time: PropTypes.string,
  lastChat: PropTypes.string,
  unread: PropTypes.number,
};

export default ChatListItem;
