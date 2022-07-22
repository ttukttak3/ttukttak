import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './SearchBookPage.style';

const SearchBookPage = () => {
  const { Wrapper, SearchBtn } = style;
  const navigate = useNavigate();
  return (
    <Wrapper>
      <SearchBtn onClick={() => navigate('/search')}>도서 검색</SearchBtn>
      {/* 여기 검색해서 선택된 책 결과 떠야함  */}
    </Wrapper>
  );
};

export default SearchBookPage;
