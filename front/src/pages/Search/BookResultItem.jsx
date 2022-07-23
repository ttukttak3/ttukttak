import React from 'react';
import style from './BookResultItem.style';

const BookResultItem = ({ item, setCurrentBook }) => {
  const { name, author, image } = item;
  const { Wrapper, BookName, BookAuthor, BookImg } = style;

  return (
    <Wrapper onClick={() => setCurrentBook(item)}>
      <BookImg src={image}></BookImg>
      <BookName>{name}</BookName>
      <BookAuthor>{author}</BookAuthor>
    </Wrapper>
  );
};

export default BookResultItem;
