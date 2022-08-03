import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './AccountPage.style';
import bookApi from '../../util/BookApi';
import BookListItem from './BookListItem';
import Loader from '../../components/common/Loader';

const BookOwnerPage = ({ userId }) => {
  const { getMyBookList } = bookApi;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [param, setParam] = useState({
    pageNum: 1,
    userId: userId,
  });
  const [bookList, setMyBookList] = useState([]);
  const BookListShow = bookList.map((item, idx) => <BookListItem key={item.id} id={item.id} imageUrl={item.imageUrl} grade={item.grade} />);

  // infinite Scroll Event
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setLoader(true);
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      param.pageNum++;
      getMyBookList(param, setMyBookList, setLoader);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    getMyBookList(param, setMyBookList, setLoader);
    return () => {};
  }, [dispatch, param, getMyBookList]);

  const { BookWrap, NoItem, BookBox } = style;
  return (
    <BookWrap>
      {BookListShow.length === 0 ? <NoItem>책을 등록해 보세요!</NoItem> : <BookBox>{BookListShow}</BookBox>}
      {loader && <Loader />}
    </BookWrap>
  );
};

export default BookOwnerPage;
