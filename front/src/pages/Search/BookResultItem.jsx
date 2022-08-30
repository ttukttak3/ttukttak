import React from 'react';
import style from './BookResultItem.style';
import noImg from '../../assets/img/logo/postb_default.svg';

const BookResultItem = ({ item, setCurrentBook }) => {
  const { name, author, image } = item;
  const { Wrapper, BookName, BookAuthor, BookImg } = style;
  const onErrorImg = e => {
    e.target.src = noImg;
  };
  return (
    <Wrapper onClick={() => setCurrentBook(item)}>
      <BookImg src={image ? image : ''} onError={onErrorImg}></BookImg>
      <BookName>{name}</BookName>
      <BookAuthor>{author}</BookAuthor>
    </Wrapper>
  );
};

export default BookResultItem;
