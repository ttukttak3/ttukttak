/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RentListItem from '../RentListItem';
import style from './RentListPage.style';
import api from '../../../util/RentApi';
import errorImg from '../../../assets/img/logo/Error_outline.svg';
//import smallDown from '../../assets/img/arrows/small_down.svg';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../Home/DetailList/slide.css';

const RentListPage = () => {
  const { RentListWrap, NoItem } = style;
  const { getRentList } = api;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector(state => state.user);
  const [rentList, setRentList] = useState([]);
  const [rentListShow, setRentListShow] = useState([]);
  const [returnListShow, setReturnListShow] = useState([]);
  const [loader, setLoader] = useState(false);
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
      getRentList(param, setRentList, setLoader);
      // fetchingData();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    getRentList(param, setRentList, setLoader).then(result => {
      setRentListShow(result.contents.filter(content => content.status === 'RENTED'));
      setReturnListShow(result.contents.filter(content => content.status !== 'RENTED'));
    });
    return () => {};
  }, [param, getRentList]);

  return (
    <RentListWrap className="rent">
      {rentListShow?.length === 0 && returnListShow?.length === 0 ? (
        <NoItem>
          <img src={errorImg} alt="느낌표" />
          아직 빌려준 도서가 없어요
        </NoItem>
      ) : (
        <>
          <Swiper modules={[Pagination]} slidesPerView={1} pagination={{ clickable: true }}>
            {rentListShow.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <RentListItem mode={'rent'} item={item} key={item.id} onClick={() => navigate(`/rent/${item.id}`)}></RentListItem>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {returnListShow.map(item => (
            <RentListItem mode={'rent'} item={item} key={item.id} onClick={() => navigate(`/rent/${item.id}`)}></RentListItem>
          ))}
        </>
      )}

      {/*  예약 중 컴포넌트 대여내역에 안 보여줄 예정 
      <BookingBox>
        <ul>
          <li>
            <h2>
              <span className="bigGray">
                예약중 <img src={smallDown} alt="버튼" />
              </span>
              대여 예정인 도서
              <img className="booking" src={moreGray} alt="더보기" />
            </h2>
            <BookBox onClick={() => navigate('/rent/detail')}>
              <div>
                <img src={noImg} alt="도서 이미지" />
              </div>
              <BookInfo className="booking">
                <h3>
                  불편한 편의점
                  <span>베르나르 베르베르</span>
                </h3>
                <img src={arrowRight} alt=">" />
                <BookPrice className="booking">
                  <div>
                    <p>대여료</p>
                    <p>2,000원</p>
                  </div>
                  <div>
                    <p>보증금</p>
                    <p>15,000원</p>
                  </div>
                </BookPrice>
              </BookInfo>
            </BookBox>
          </li>
        </ul>
      </BookingBox> */}
    </RentListWrap>
  );
};

export default RentListPage;
