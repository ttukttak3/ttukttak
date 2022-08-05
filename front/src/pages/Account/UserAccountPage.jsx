/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setAllFalse, setTitle, setBack } from '../../app/headerSlice';
import BookOwnerPage from './BookOwnerPage';
import BookRentPage from './BookRentPage';
import rentApi from '../../util/RentApi';
import profileApi from '../../util/ProfileApi';
import style from './AccountPage.style';
import noImg from '../../assets/img/logo/postp_default.svg';

const UserAccountPage = () => {
  const location = useLocation();
  const userId = location.state.id;
  const dispatch = useDispatch();
  const { getUser } = profileApi;
  const [user, setUser] = useState([]);

  //--------------header START--------------
  useEffect(() => {
    getUser(userId).then(result => {
      setUser(result);
      dispatch(setAllFalse());
      dispatch(setBack(true));
      dispatch(setTitle(`${result.nickname}님의 책방`));
    });
    return () => {};
  }, [dispatch, getUser]);

  //빌려준 횟수, 빌린 횟수
  const [param, setParam] = useState({
    pageNum: 1,
    userId: userId,
  });

  const [rentList, setRentList] = useState([]);
  const [borrowList, setBorrowList] = useState([]);
  const { getRentList, getBorrowList } = rentApi;

  useEffect(() => {
    param.userId && getRentList(param, setRentList);
    param.userId && getBorrowList(param, setBorrowList);
  }, [dispatch, getRentList, getBorrowList]);

  //-------------- tab ----------------
  const [activeIndex, setActiveIndex] = useState(0);
  const tabClickHandler = index => {
    setActiveIndex(index);
  };
  const tabContArr = [
    {
      tabTitle: (
        <h2 key={0} className={activeIndex === 0 ? 'on' : ''} onClick={() => tabClickHandler(0)}>
          빌려줄 책
        </h2>
      ),
      tabCont: <BookOwnerPage userId={userId}></BookOwnerPage>,
    },
    {
      tabTitle: (
        <h2 key={1} className={activeIndex === 1 ? 'on' : ''} onClick={() => tabClickHandler(1)}>
          빌린 책
        </h2>
      ),
      tabCont: <BookRentPage userId={userId}></BookRentPage>,
    },
  ];

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  //처음 스크롤 값은 0으로 false 초기 값 세팅
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    //scrollY > 50을 기준으로 state 변경
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 50) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= 50) {
        setScrolled(false);
      }
    };
    //스크롤 이벤트 시 handleScroll 동작
    window.addEventListener('scroll', handleScroll);
    return () => {
      //cleanup
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const { AccountBox, UserInfo, Counting, Top, CountingWrap, TabBox } = style;
  return (
    <AccountBox>
      <UserInfo>
        <Top>
          <img onError={onErrorImg} src={user && user.imageUrl} alt="이미지" />
          <CountingWrap>
            <Counting>
              <dt>빌려준 횟수</dt>
              <dd>{rentList.totalElements}회</dd>
            </Counting>
            <Counting>
              <dt>빌린 횟수</dt>
              <dd>{borrowList.totalElements}회</dd>
            </Counting>
          </CountingWrap>
        </Top>
        <h2>{user && user.nickname}</h2>
        <h4>{user && user.homeTown ? user.homeTown.town.address : ''}</h4>
        <h6>{user && user.introduction}</h6>
      </UserInfo>
      <TabBox className={scrolled ? 'active' : 'activeN'}>
        {tabContArr.map(section => {
          return section.tabTitle;
        })}
      </TabBox>
      {tabContArr[activeIndex].tabCont}
    </AccountBox>
  );
};

export default UserAccountPage;
