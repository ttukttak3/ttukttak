import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RentListItem from '../RentListItem';
import api from '../../../util/RentApi';
import { useSelector, useDispatch } from 'react-redux';

const BorrowListPage = () => {
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();
  const { getBorrowList } = api;
  const dispatch = useDispatch();
  const [borrowList, setBorrowList] = useState([]);
  const [loader, setLoader] = useState(false);
  const { userId } = useSelector(state => state.user);
  const [param, setParam] = useState({
    pageNum: 1,
    userId: userId,
  });

  // infinite Scroll Event
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setLoader(true);
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      param.pageNum++;
      getBorrowList(param, setRentList, setLoader);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    getBorrowList(param, setBorrowList);
    return () => {};
  }, [dispatch, param, getBorrowList]);

  return (
    <>
      <div>차입</div>
      {bookList.map(item => (
        <RentListItem mode={'borrow'} onClick={() => navigate(`/borrow/${rentId}`)}></RentListItem>
      ))}
    </>
  );
};

export default BorrowListPage;
