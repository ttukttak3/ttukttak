import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './SearchBookPage.style';
import SelectedBookInfo from '../UploadBook/SelectedBookInfo';

const SearchBookPage = ({ categoryList }) => {
  const { Wrapper, SearchBtn } = style;
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;
  return (
    <Wrapper>
      <SearchBtn onClick={() => navigate('/search')}>도서 검색</SearchBtn>
      {item && <SelectedBookInfo item={item} categoryList={categoryList}></SelectedBookInfo>}
    </Wrapper>
  );
};

export default SearchBookPage;
