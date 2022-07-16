import React, { useEffect, useState } from 'react';
import style from './SearchListPage.style';
import bookApi from '../../util/BookApi';
import Search from '../../assets/img/userInterFace/Search.png';

const SearchListPage = () => {
  const { Wrapper, SearchBar, SearchBtn } = style;
  const { interparkSearch } = bookApi;
  const [resultList, setResultList] = useState([]);
  const [keyword, setKeyword] = useState();

  const searchKeyword = async () => {
    const result = await interparkSearch(1, keyword);
    console.log(result);
  };

  return (
    <Wrapper>
      <SearchBar onChange={e => setKeyword(e.target.value)} value={keyword}></SearchBar>
      <SearchBtn onClick={() => searchKeyword()}>
        <img src={Search} alt="search" />
      </SearchBtn>
      {resultList.length <= 0 ? <div>찾고 싶은 책을 검색해보세요.</div> : resultList.map(item => <>{item.contents}</>)}
    </Wrapper>
  );
};

export default SearchListPage;
