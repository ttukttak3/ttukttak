/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './HomePage.style';
import bookApi from '../../util/BookApi';
import BookListItem from './BookListItem';
import Loader from '../../components/common/Loader';

const BookOnLoadPage = ({ range, category, townId }) => {
  const { getBookList } = bookApi;
  const dispatch = useDispatch();
  //loading spinner
  const [loader, setLoader] = useState(false);
  const [param, setParam] = useState({
    pageNum: 1,
    order: range,
    status: 'ING',
    townId: townId,
    categoryId: category,
  });

  const [bookList, setBookList] = useState([]);
  const BookListShow = bookList.map((item, idx) => (
    <BookListItem
      key={item.id}
      id={item.id}
      thumbnail={item.thumbnail}
      grade={item.grade}
      subject={item.subject}
      author={item.author}
      address={item.address}
      status={item.status}
      content={item.content}
      deposit={item.deposit}
      rating={item.rating}
      rentCnt={item.rentCnt}
    />
  ));

  // infinite Scroll Event
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setLoader(true);
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      param.pageNum++;
      getBookList(param, setBookList, setLoader);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    setLoader(true);
    getBookList(param, setBookList, setLoader);
    return () => {};
  }, [dispatch, param, getBookList, range]);

  const { BookWrap, NoItem } = style;
  return (
    <BookWrap>
      {BookListShow.length === 0 ? <NoItem>대여중/예약중 책이 없습니다.</NoItem> : BookListShow}
      {loader && <Loader />}
    </BookWrap>
  );
};

export default BookOnLoadPage;
