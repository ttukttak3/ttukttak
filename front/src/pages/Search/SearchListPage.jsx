/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBack, setAllFalse, setLocationBox, setPlaceholder } from '../../app/headerSlice';
import style from './SearchListPage.style';
import bookApi from '../../util/BookApi';
import BookResultItem from './BookResultItem';
import Loader from '../../components/common/Loader';

const SearchListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { interparkSearch } = bookApi;
  const [loader, setLoader] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [resultList, setResultList] = useState([]);
  const [totalResultCount, setTotalResultCount] = useState(0);
  const [isAction, setIsAction] = useState(false);
  const [eventListener, setEventListener] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  //---------------header START---------------
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setLocationBox(true));
    dispatch(setBack(true));
    dispatch(setPlaceholder('검색할 도서를 입력해주세요.'));
    setEventListener(true);
    return () => {};
  }, [dispatch]);

  const searchInputKeyUp = e => {
    if (e.key === 'Enter') {
      searchBtnClick();
    }
  };

  const searchBtnClick = () => {
    //페이지 초기화
    setPageNum(1);
    //스크롤 탑
    window.scrollTo(0, 0);
    //eventListner 재 실행 막기
    if (isAction) {
      return;
    }
    setIsAction(true);
    if (document.getElementById('searchInput').value === '') {
      alert('도서명을 입력하세요');
    } else {
      searchKeyword();
    }
  };

  useEffect(() => {
    //header search input
    if (eventListener) {
      document.getElementById('searchInput').addEventListener('keyup', searchInputKeyUp);
      document.getElementById('searchBtn').addEventListener('click', searchBtnClick);
    }
    return () => {
      document.getElementById('searchInput').removeEventListener('keyup', searchInputKeyUp);
      document.getElementById('searchBtn').removeEventListener('click', searchBtnClick);
    };
  }, [eventListener]);

  const searchKeyword = async () => {
    setLoader(true);
    const result = await interparkSearch(pageNum, document.getElementById('searchInput').value);
    setResultList([...resultList, ...result.contents]);
    setTotalResultCount(result.totalElements.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    setLoader(false);
  };
  const setCurrentBook = item => {
    setSelectedBook(item);
    navigate(`/upload`, { state: { item: item } });
  };

  // infinite Scroll Event
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      let pageNo = pageNum + 1;
      setPageNum(pageNo);
      searchKeyword();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const { SearchBox, BookList, NoResult } = style;
  return (
    <SearchBox>
      <span>검색결과 ({totalResultCount})</span>
      <BookList>
        {resultList.length <= 0 ? <NoResult>찾고 싶은 책을 검색해보세요.</NoResult> : resultList.map((item, index) => <BookResultItem item={item} key={index} setCurrentBook={setCurrentBook} />)}
      </BookList>
      {loader && <Loader />}
    </SearchBox>
  );
};

export default SearchListPage;
