import React from 'react';
import style from './BorrowGoLink.style';
import { useNavigate } from 'react-router-dom';

const BorrowGoLink = ({ bookId, chatId, ownerId }) => {
  const { GoPage } = style;
  const navigate = useNavigate();

  return (
    <GoPage>
      <ul>
        <li onClick={() => navigate(`/detailBook`, { replace: true, state: { id: bookId } })}>도서 포스트 바로가기</li>
        <li onClick={() => navigate(`/chat/room`, { state: { id: chatId } })}>대여자와의 채팅</li>
        <li onClick={() => navigate('/userAccount', { state: { id: ownerId } })}>대여자 프로필</li>
      </ul>
    </GoPage>
  );
};

export default BorrowGoLink;
