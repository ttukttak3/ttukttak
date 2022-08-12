import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './AccountPage.style';
import rentApi from '../../util/RentApi';
import BookListItem from './BookListItem';
import Loader from '../../components/common/Loader';

const BookRentPage = ({ userId }) => {
  const { getBorrowList } = rentApi;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [param, setParam] = useState({
    pageNum: 1,
    userId: userId,
  });
  const [borrowList, setBorrowList] = useState({ contents: [] });
  const BorrowListShow = borrowList.contents.map((item, idx) => <BookListItem key={item.book.id} id={item.book.id} imageUrl={item.book.thumbnail.imageUrl} grade={item.book.grade} />);

  // infinite Scroll Event
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setLoader(true);
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      param.pageNum++;
      getBorrowList(param, setBorrowList, setLoader);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    getBorrowList(param, setBorrowList, setLoader);
    return () => {};
  }, [dispatch, param, getBorrowList]);

  const { BookWrap, NoItem, BookBox } = style;
  return (
    <BookWrap>
      {BorrowListShow.length === 0 ? <NoItem>책을 빌려보세요!</NoItem> : <BookBox>{BorrowListShow}</BookBox>}
      {loader && <Loader />}
    </BookWrap>
  );
};

export default BookRentPage;
