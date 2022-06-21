import React from 'react';
import style from './SearchBookPage.style';

const SearchBookPage = () => {
  const { Wrapper, SearchBtn } = style;
  return (
    <Wrapper>
      <SearchBtn>도서 검색</SearchBtn>
    </Wrapper>
  );
};

export default SearchBookPage;
