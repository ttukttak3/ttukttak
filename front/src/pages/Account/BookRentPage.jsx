import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './AccountPage.style';
import rentApi from '../../util/RentApi';
import BookListItem from './BookListItem';

const BookRentPage = ({ userId }) => {
  const { getRentList } = rentApi;
  const dispatch = useDispatch();
  const [param, setParam] = useState({
    pageNum: 1,
    userId: userId,
  });
  const [rentList, setRentList] = useState({ contents: [] });
  const RentListShow = rentList.contents.map((item, idx) => <BookListItem key={item.book.id} id={item.book.id} imageUrl={item.book.thumbnail.imageUrl} grade={item.book.grade} />);

  useEffect(() => {
    getRentList(param, setRentList);
    return () => {};
  }, [dispatch, param, getRentList]);

  const { BookWrap, NoItem, BookBox } = style;
  return <BookWrap>{RentListShow.length === 0 ? <NoItem>책을 빌려보세요!</NoItem> : <BookBox>{RentListShow}</BookBox>}</BookWrap>;
};

export default BookRentPage;
