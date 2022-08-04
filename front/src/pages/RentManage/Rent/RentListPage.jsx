/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import RentListItem from '../RentListItem';
import style from '../RentListItem.style';
import api from '../../../util/RentApi';
import errorImg from '../../../assets/img/logo/Error_outline.svg';
import noImg from '../../../assets/img/logo/homeb_default.svg';
import moreGray from '../../../assets/img/userInterFace/more_gray.svg';
import arrowRight from '../../../assets/img/arrows/Keyboard_arrow_right.svg';
import smallDown from '../../../assets/img/arrows/small_down.svg';
import { useSelector, useDispatch } from 'react-redux';

const RentListPage = () => {
  const { RentListWrap, NoItem, RentIngBox, BookBox, BookInfo, BookPrice, ReturnBox, PaddingBox, BookingBox } = style;
  const { getRentList } = api;
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.user);
  const [rentList, setRentList] = useState([]);
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

  return (
    <RentListWrap>
      {/* {rentList.length === 0 ? (
        <NoItem>
          <img src={errorImg} alt="느낌표" />
          아직 대여해준 도서가 없어요
        </NoItem>
      ) : (
        rentList.map(item => <RentListItem mode={item.status} onClick={() => navigate(`/rent/${rentId}`)}></RentListItem>)
      )} */}
      <RentIngBox>
        <ul>
          <li>
            <h2>대여가 진행중이에요.</h2>
            <BookBox>
              <div>
                <img src={noImg} alt="도서 이미지" />
              </div>
              <BookInfo>
                <h3>
                  불편한 편의점ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                  <span>베르나르 베르베르</span>
                </h3>
                <img src={arrowRight} alt=">" />
                <h6>대여일자 2022.06.03</h6>
                <BookPrice>
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
            <button>대여현황</button>
          </li>
        </ul>
      </RentIngBox>
      <ReturnBox>
        <ul>
          <li>
            <PaddingBox>
              <h2>
                2022.06.17 · 반납 완료
                <img src={moreGray} alt="더보기" />
              </h2>
              <BookBox>
                <div>
                  <img src={noImg} alt="도서 이미지" />
                </div>
                <BookInfo>
                  <h3>
                    반납 완료 베르
                    <span>베르나르 베르베르</span>
                  </h3>
                  <img src={arrowRight} alt=">" />
                  <h6>대여일자 2022.06.03</h6>
                  <BookPrice>
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
            </PaddingBox>
            <button>리뷰보기</button>
          </li>
        </ul>
      </ReturnBox>
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
            <BookBox>
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
      </BookingBox>
    </RentListWrap>
  );
};

export default RentListPage;
