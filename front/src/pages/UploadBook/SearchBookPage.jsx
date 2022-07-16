import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './SearchBookPage.style';

const SearchBookPage = () => {
  const { Wrapper, SearchBtn } = style;
  const navigate = useNavigate();
  return (
    <Wrapper>
      <SearchBtn onClick={() => navigate('/search')}>도서 검색</SearchBtn>
    </Wrapper>
  );
};

export default SearchBookPage;
