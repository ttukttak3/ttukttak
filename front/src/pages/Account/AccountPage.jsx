/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSettings, setAllFalse, setTitle } from '../../app/headerSlice';
import BookOwnerPage from './BookOwnerPage';
import BookRentPage from './BookRentPage';
import rentApi from '../../util/RentApi';
import style from './AccountPage.style';
import noImg from '../../assets/img/logo/postp_default.svg';
const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //--------------header START--------------
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle('나의 책방'));
    dispatch(setSettings(true));
    //로그인 back history
    localStorage.setItem('url', '/account');
    //프로필 수정 history reset
    localStorage.removeItem('backNickName');
    localStorage.removeItem('backIntroduction');
    localStorage.removeItem('backTownId');
    localStorage.removeItem('backAddress');
    localStorage.removeItem('backImgPreview');
    localStorage.removeItem('backImgFile');
    return () => {};
  }, [dispatch]);

  //빌려준 횟수, 빌린 횟수
  const [param, setParam] = useState({
    pageNum: 1,
    userId: user.userId,
  });

  const [rentList, setRentList] = useState([]);
  const [borrowList, setBorrowList] = useState([]);
  const { getRentList, getBorrowList } = rentApi;

  useEffect(() => {
    param.userId && getRentList(param, setRentList);
    param.userId && getBorrowList(param, setBorrowList);
  }, [dispatch, getRentList, getBorrowList]);

  //-------------- tab --------------
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
      tabCont: user.userId && <BookOwnerPage userId={user.userId}></BookOwnerPage>,
    },
    {
      tabTitle: (
        <h2 key={1} className={activeIndex === 1 ? 'on' : ''} onClick={() => tabClickHandler(1)}>
          빌린 책
        </h2>
      ),
      tabCont: user.userId && <BookRentPage userId={user.userId}></BookRentPage>,
    },
  ];

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  //처음 스크롤 값은 0으로 false 초기 값 세팅
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    //scrollY > 130을 기준으로 state 변경
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 130) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= 130) {
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

  const { AccountBox, UserInfo, Counting, Top, CountingWrap, TabBox, PlusBtn } = style;
  return (
    <AccountBox>
      <UserInfo>
        <Top>
          <img onError={onErrorImg} src={user.imageFile ? user.imageFile : ''} alt="이미지" />
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
        <h2>{user.nickName}</h2>
        <h4>{user.homeTown ? user.homeTown.town.address : ''}</h4>
        <h6>{user.introduction}</h6>
        <button onClick={() => navigate('/account/profile')}>프로필 편집</button>
      </UserInfo>
      <TabBox className={scrolled ? 'active' : 'activeN'}>
        {tabContArr.map(section => {
          return section.tabTitle;
        })}
      </TabBox>
      {tabContArr[activeIndex].tabCont}
      <PlusBtn onClick={() => navigate('/upload')} />
    </AccountBox>
  );
};

export default AccountPage;
