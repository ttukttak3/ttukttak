/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './SearchListPage.style';
import bookApi from '../../util/BookApi';
import Search from '../../assets/img/userInterFace/Search.png';
import BookResultItem from './BookResultItem';
import { setAllFalse } from '../../app/headerSlice';
import keyboardArrowLeft from '../../assets/img/arrows/Keyboard_arrow_left.png';
import clear from '../../assets/img/arrows/Clear.png';

const SearchListPage = () => {
  const { Wrapper, SearchBarWrapper, SearchBar, SearchBtn, ClearBtn, BookList, SearchResult, NoResult, BackBtn } = style;
  const { interparkSearch } = bookApi;
  const [resultList, setResultList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [totalResultCount, setTotalResultCount] = useState(0);
  const [selectedBook, setSelectedBook] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAllFalse());
  }, []);

  useEffect(() => {
    console.log(selectedBook);
  }, [selectedBook]);

  //scroll 됐을 때 pagination 요청
  const searchKeyword = async () => {
    console.log(keyword);
    const result = await interparkSearch(1, keyword);
    setResultList([...resultList, ...result.contents]);
    setTotalResultCount(result.pageSize * result.totalPages);
  };

  const setCurrentBook = item => {
    // console.log(item);
    setSelectedBook(item);
    navigate(`/upload`, { state: { item: item } });
  };

  return (
    <Wrapper>
      <SearchBarWrapper>
        <BackBtn onClick={() => navigate(-1)}>
          <img src={keyboardArrowLeft} alt={'이전 화면으로 이동'}></img>
        </BackBtn>
        <SearchBar onChange={e => setKeyword(e.target.value)} value={keyword}></SearchBar>
        {keyword.length > 1 && (
          <ClearBtn onClick={() => setKeyword('')}>
            <img src={clear} alt="검색어 삭제" />
          </ClearBtn>
        )}
        <SearchBtn onClick={() => searchKeyword()}>
          <img src={Search} alt="search" />
        </SearchBtn>
      </SearchBarWrapper>
      <SearchResult>검색결과 ({totalResultCount})</SearchResult>
      <BookList>
        {resultList.length <= 0 ? <NoResult>찾고 싶은 책을 검색해보세요.</NoResult> : resultList.map((item, index) => <BookResultItem item={item} key={index} setCurrentBook={setCurrentBook} />)}
      </BookList>
    </Wrapper>
  );
};

export default SearchListPage;
