import React from 'react';
import style from './BookResultItem.style';

const BookResultItem = ({ item }) => {
  const { name, author, image } = item;
  const { Wrapper, BookName, BookAuthor, BookImg } = style;

  return (
    <Wrapper>
      <BookImg src={image}></BookImg>
      <BookName>{name}</BookName>
      <BookAuthor>{author}</BookAuthor>
    </Wrapper>
  );
};

export default BookResultItem;
