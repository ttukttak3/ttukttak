/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBack, setBackHome, setTitle, setLocation, setSearch, setFavorite, setAlert, setAllFalse } from '../../app/headerSlice';
import style from './HomePage.style';
import BookRentPage from './BookRentPage';
import BookOnLoadPage from './BookOnLoanPage';
import bookApi from '../../util/BookApi';
import Popup from '../../components/Modal/SelectPopupBottom';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  //-------------- Header --------------
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setTitle('우리집'));
    dispatch(setLocation(true));
    dispatch(setSearch(true));
    dispatch(setFavorite(true));
    dispatch(setAlert(true));
    return () => {};
  }, [dispatch]);

  //-------------- popup --------------
  const [range, setRange] = useState({
    id: 0,
    text: '최신순',
    param: 'id',
  });

  const [rangeShowing, setRangeShowing] = useState(false);
  const rangeContents = [
    {
      message: '최신순',
      onClick: () => {
        setRange({
          id: 0,
          text: '최신순',
          param: 'id',
        });
        setKeyEvent('최신순');
      },
    },
    {
      message: '거리순',
      onClick: () => {
        setRange({
          id: 1,
          text: '거리순',
          param: 'location',
        });
        setKeyEvent('거리순');
      },
    },
    {
      message: '보증금순',
      onClick: () => {
        setRange({
          id: 2,
          text: '보증금순',
          param: 'deposit',
        });
        setKeyEvent('보증금순');
      },
    },
  ];

  const { getBookCategory } = bookApi;
  const [category, setCategory] = useState({
    id: '0',
    name: '카테고리',
  });
  const [categoryShowing, setCategoryShowing] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const categoryContents = [
    {
      message: '전체',
      onClick: () => {
        setCategory({
          id: 0,
          name: '전체',
        });
        setKeyEvent('전체');
      },
    },
  ];

  useEffect(() => {
    getBookCategory().then(result => {
      setCategoryList(result);
    });
  }, []);

  categoryList.map(category => {
    return categoryContents.push({
      message: category.name,
      onClick: () => {
        setCategory({
          id: category.id,
          name: category.name,
        });
        setKeyEvent(category.name);
      },
    });
  });

  const openModal = kind => {
    if (kind === 'range') {
      setRangeShowing(true);
      document.body.style.overflow = 'hidden';
    } else {
      setCategoryShowing(true);
      document.body.style.overflow = 'hidden';
    }
  };
  const navigate = useNavigate();

  //close popup
  const modalEl = useRef(null);
  const handleClickOutside = ({ target }) => {
    if (rangeShowing && !modalEl.current.contains(target)) setRangeShowing(false);
    if (categoryShowing && !modalEl.current.contains(target)) setCategoryShowing(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  //배열 렌더링 key값
  const [keyEvent, setKeyEvent] = useState('');

  //-------------- tab --------------
  const [activeIndex, setActiveIndex] = useState(0);
  const tabClickHandler = index => {
    setActiveIndex(index);
  };
  const tabContArr = [
    {
      tabTitle: (
        <h2 key={0} className={activeIndex === 0 ? 'active' : 'hide'} onClick={() => tabClickHandler(1)}>
          대여가능
        </h2>
      ),
      tabCont: <BookRentPage range={range.param} category={category.id} key={keyEvent} />,
    },
    {
      tabTitle: (
        <h2 key={1} className={activeIndex === 1 ? 'active' : 'hide'} onClick={() => tabClickHandler(0)}>
          대여중/예약중
        </h2>
      ),
      tabCont: <BookOnLoadPage range={range.param} category={category.id} key={keyEvent} />,
    },
  ];

  const { HomeWrap, TitleBox, PlusBtn } = style;
  return (
    <HomeWrap ref={modalEl}>
      <TitleBox>
        {tabContArr.map(section => {
          //대여가능, 대여중/예약중
          return section.tabTitle;
        })}
        <button onClick={() => openModal('range')}>{range.text}</button>
        <button onClick={() => openModal('category')}>{category.name}</button>
      </TitleBox>
      {tabContArr[activeIndex].tabCont}
      <PlusBtn onClick={() => navigate('/upload')} />
      {/* popup */}
      {rangeShowing && <Popup title={'정렬 설정'} contents={rangeContents} />}
      {categoryShowing && <Popup title={'카테고리'} contents={categoryContents} />}
    </HomeWrap>
  );
};

export default HomePage;
