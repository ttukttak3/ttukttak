import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './AccountPage.style';
import bookApi from '../../util/BookApi';
import BookListItem from './BookListItem';

const BookOwnerPage = ({ userId }) => {
  const { getMyBookList } = bookApi;
  const dispatch = useDispatch();
  const [param, setParam] = useState({
    pageNum: 1,
    userId: userId,
  });
  const [bookList, setMyBookList] = useState([]);
  const BookListShow = bookList.map((item, idx) => <BookListItem key={item.id} id={item.id} imageUrl={item.imageUrl} grade={item.grade} />);

  useEffect(() => {
    getMyBookList(param, setMyBookList);
    return () => {};
  }, [dispatch, param, getMyBookList]);

  const { BookWrap, NoItem, BookBox } = style;
  return <BookWrap>{BookListShow.length === 0 ? <NoItem>책을 등록해 보세요!</NoItem> : <BookBox>{BookListShow}</BookBox>}</BookWrap>;
};

export default BookOwnerPage;
