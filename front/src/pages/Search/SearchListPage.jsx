import React, { useEffect, useState } from 'react';
import style from './SearchListPage.style';
import bookApi from '../../util/BookApi';
import Search from '../../assets/img/userInterFace/Search.png';
import BookResultItem from './BookResultItem';

const SearchListPage = () => {
  const { Wrapper, SearchBar, SearchBtn, BookList } = style;
  const { interparkSearch } = bookApi;
  const [resultList, setResultList] = useState([]);
  const [keyword, setKeyword] = useState();
  const [totalResultCount, setTotalResultCount] = useState(0);

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
      <div>검색결과 ({totalResultCount})</div>
      <BookList>{resultList.length <= 0 ? <div>찾고 싶은 책을 검색해보세요.</div> : resultList.map((item, index) => <BookResultItem item={item} key={index} />)}</BookList>
    </Wrapper>
  );
};

export default SearchListPage;
