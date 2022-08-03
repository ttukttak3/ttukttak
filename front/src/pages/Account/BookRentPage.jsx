import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './AccountPage.style';
import rentApi from '../../util/RentApi';
import BookListItem from './BookListItem';
import Loader from '../../components/common/Loader';

const BookRentPage = ({ userId }) => {
  const { getRentList } = rentApi;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [param, setParam] = useState({
    pageNum: 1,
    userId: userId,
  });
  const [rentList, setRentList] = useState({ contents: [] });
  const RentListShow = rentList.contents.map((item, idx) => <BookListItem key={item.book.id} id={item.book.id} imageUrl={item.book.thumbnail.imageUrl} grade={item.book.grade} />);

  // infinite Scroll Event
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setLoader(true);
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      param.pageNum++;
      getRentList(param, setRentList, setLoader);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    getRentList(param, setRentList, setLoader);
    return () => {};
  }, [dispatch, param, getRentList]);

  const { BookWrap, NoItem, BookBox } = style;
  return <BookWrap>{RentListShow.length === 0 ? <NoItem>책을 빌려보세요!</NoItem> : <BookBox>{RentListShow}</BookBox>}</BookWrap>;
};

export default BookRentPage;
