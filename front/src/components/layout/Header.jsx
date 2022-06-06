import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './Header.style';
import keyboard_arrow_left from '../../assets/img/arrows/Keyboard_arrow_left.png';
import Notifications from '../../assets/img/userInterFace/Notifications.png';
import Notifications_On from '../../assets/img/userInterFace/Notifications_On.png';
import Trash_Can from '../../assets/img/userInterFace/Trash_Can.png';

const Header = () => {
  const { HeaderBox, Title, BackBtn, RightBtn } = style;
  const navigate = useNavigate();
  const header = useSelector(state => state.header);
  const { title, back, location, alert, trash } = header;
  return (
    <HeaderBox>
      {back && <BackBtn src={keyboard_arrow_left} alt={'뒤로가기'} onClick={() => navigate(-1)} />}
      <Title>{title}</Title>
      {alert && <RightBtn src={Notifications} alt={'알림목록'} onClick={() => navigate(`/chat/alert`)} />}
      {trash && <RightBtn src={Trash_Can} alt={'삭제버튼'} />}
    </HeaderBox>
  );
};

export default Header;
