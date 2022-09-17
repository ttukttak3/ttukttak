import React from 'react';
import style from './RentGoLink.style';
import { useNavigate } from 'react-router-dom';

const RentGoLink = ({ bookId, chatId, ownerId }) => {
  const { GoPage } = style;
  const navigate = useNavigate();

  return (
    <GoPage>
      <ul>
        <li onClick={() => navigate(`/detailBook`, { replace: true, state: { id: bookId } })}>도서 포스트 바로가기</li>
        <li onClick={() => navigate(`/chat/room`, { state: { id: chatId } })}>차입자와의 채팅</li>
        <li onClick={() => navigate('/userAccount', { state: { id: ownerId } })}>차입자 프로필</li>
      </ul>
    </GoPage>
  );
};

export default RentGoLink;
