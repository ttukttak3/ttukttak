/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RentListItem from '../RentListItem';
import api from '../../../util/RentApi';
import { useSelector, useDispatch } from 'react-redux';
import style from './BorrowListPage.style';
import errorImg from '../../../assets/img/logo/Error_outline.svg';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../Home/DetailList/slide.css';

const BorrowListPage = () => {
  const { RentListWrap, NoItem } = style;
  const { getBorrowList } = api;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [borrowList, setBorrowList] = useState([]);
  const [borrowListShow, setBorrowListShow] = useState([]);
  const [returnListShow, setReturnListShow] = useState([]);
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
      getBorrowList(param, setRentList);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    getBorrowList(param, setBorrowList).then(result => {
      setBorrowListShow(result.contents.filter(content => content.status === 'RENTED'));
      setReturnListShow(result.contents.filter(content => content.status !== 'RENTED'));
    });

    return () => {};
  }, [param, getBorrowList]);

  return (
    <RentListWrap className="rent">
      {borrowListShow?.length === 0 ? (
        <NoItem>
          <img src={errorImg} alt="느낌표" />
          아직 빌려 본 도서가 없어요
        </NoItem>
      ) : (
        <>
          <Swiper modules={[Pagination]} slidesPerView={1} pagination={{ clickable: true }}>
            {borrowListShow.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <RentListItem mode={'borrow'} item={item} key={item.id} onClick={() => navigate(`/borrow/${item.id}`)}></RentListItem>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {returnListShow.map(item => (
            <RentListItem mode={'borrow'} item={item} key={item.id} onClick={() => navigate(`/rent/${item.id}`)}></RentListItem>
          ))}
        </>
      )}
    </RentListWrap>
  );
};

export default BorrowListPage;
