/* eslint-disable max-lines-per-function */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './ChatListItem.style';
import noneUserIcon from '../../../assets/img/userInterFace/userNone.png';
import noImg from '../../../assets/img/logo/homeb_default.svg';

const ChatListItem = ({ id, imgUrl, userName, time, lastChat, unread }) => {
  const { Wrapper, ImgBox, UserName, LastChat, InfoWrapper } = style;
  const navigate = useNavigate();
  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const dateForTime = value => {
    if (!value) {
      return '';
    }
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 48) {
      return `어제`;
    }

    return timeValue.toLocaleTimeString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Wrapper key={id} onClick={() => navigate(`/chat/room`, { state: { id: id } })}>
      <ImgBox>
        <img src={imgUrl === null ? '' : imgUrl} onError={onErrorImg} alt="프로필이미지" />
      </ImgBox>

      <InfoWrapper>
        <UserName>
          <p className={userName === null ? 'unknown' : ''}>{userName === null ? '(탈퇴한 회원)' : userName}</p>
          <span>{dateForTime(lastChat ? time : '')}</span>
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
