import React, { useEffect, useState } from 'react';
import style from './SearchListPage.style';
import bookApi from '../../util/BookApi';
import Search from '../../assets/img/userInterFace/Search.png';
import BookResultItem from './BookResultItem';

const SearchListPage = () => {
  const { Wrapper, SearchBar, SearchBtn } = style;
  const { interparkSearch } = bookApi;
  const [resultList, setResultList] = useState([]);
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    //header 끄기 옵션 추가
  }, []);

  const searchKeyword = async () => {
    console.log(keyword);
    const result = await interparkSearch(1, keyword);
    setResultList([...resultList, ...result.contents]);
    console.log(result.contents);
  };

  return (
    <Wrapper>
      <SearchBar onChange={e => setKeyword(e.target.value)} value={keyword}></SearchBar>
      <SearchBtn onClick={() => searchKeyword()}>
        <img src={Search} alt="search" />
      </SearchBtn>
      {resultList.length <= 0 ? <div>찾고 싶은 책을 검색해보세요.</div> : resultList.map(item => <BookResultItem item={item} />)}
    </Wrapper>
  );
};

export default SearchListPage;
