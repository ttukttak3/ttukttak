import React, { useEffect, useState } from 'react';
import style from './RentListItem.style';

//차입과 대여에 reuse 할 아이템 하나
const RentListItem = ({ book, mode, onClick }) => {
  const { Wrapper, Comment } = style;
  const [comment, setComment] = useState('');
  useEffect(() => {
    if (mode === 'rent') {
      setComment('대여가 진행중이에요.');
    } else if (mode === 'borrow') {
      setComment('열심히 독서를 진행중이에요.');
    }
  }, [mode]);

  return (
    <Wrapper>
      <Comment>{comment}</Comment>
      {/* 책 정보 보여주기 */}
      <button onClick={() => onClick()}></button>
    </Wrapper>
  );
};

export default RentListItem;
