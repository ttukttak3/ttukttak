/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './HomePage.style';
import bookApi from '../../util/BookApi';
import BookListItem from './BookListItem';

const BookOnLoadPage = ({ range, category }) => {
  const { getBookList } = bookApi;
  const dispatch = useDispatch();
  const [param, setParam] = useState({
    pageNum: 1,
    order: range,
    status: 'ING',
    townId: '1147010100',
    categoryId: category,
    //로그인 유저일 경우 유저 슬라이스 값 / 비회원일 경우 처음 위치 허용 값 / 비허용일 시 1111011900
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

  useEffect(() => {
    getBookList(param, setBookList);
    return () => {};
  }, [dispatch, param, getBookList]);

  const { BookWrap, NoItem } = style;
  return <BookWrap>{BookListShow.length === 0 ? <NoItem>대여중/예약중 책이 없습니다.</NoItem> : BookListShow}</BookWrap>;
};

export default BookOnLoadPage;
