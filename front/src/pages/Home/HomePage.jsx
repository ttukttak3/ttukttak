/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBack, setBackHome, setTitle, setLocation, setSearch, setFavorite, setAlert, setAllFalse } from '../../app/headerSlice';
import style from './HomePage.style';
import BookRentPage from './BookRentPage';
import BookOnLoadPage from './BookOnLoanPage';
import Popup from '../../components/Modal/SelectPopupBottom';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  //-------------- header --------------
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
      tabCont: <BookRentPage state={'ABLE'} range={''} category={''} />,
    },
    {
      tabTitle: (
        <h2 key={1} className={activeIndex === 1 ? 'active' : 'hide'} onClick={() => tabClickHandler(0)}>
          대여중/예약중
        </h2>
      ),
      tabCont: <BookOnLoadPage range={''} category={''} />,
    },
  ];

  //-------------- popup --------------
  const [range, setRange] = useState('최신순');
  const sortEvent = N => {
    if (N === 1) {
      setRange('최신순');
    } else if (N === 2) {
      setRange('거리순');
    } else if (N === 3) {
      setRange('보증금순');
    }
  };

  const [rangeShowing, setRangeShowing] = useState(false);
  const rangeContents = [
    {
      message: '최신순',
      onClick: () => {
        sortEvent(1);
      },
    },
    {
      message: '거리순',
      onClick: () => {
        sortEvent(2);
      },
    },
    {
      message: '보증금순',
      onClick: () => {
        sortEvent(3);
      },
    },
  ];

  const [category, setCategory] = useState('카테고리');
  const categoryEvent = N => {
    if (N === 1) {
      setCategory('건강 ∙ 취미');
    } else if (N === 2) {
      setCategory('경제 ∙ 경영 ∙ 자기계발');
    } else if (N === 3) {
      setCategory('과학 ∙ 기술 ∙ 컴퓨터');
    }
  };

  const [categoryShowing, setCategoryShowing] = useState(false);
  const categoryContents = [
    {
      message: '건강 ∙ 취미',
      onClick: () => {
        categoryEvent(1);
      },
    },
    {
      message: '경제 ∙ 경영 ∙ 자기계발',
      onClick: () => {
        categoryEvent(2);
      },
    },
    {
      message: '과학 ∙ 기술 ∙ 컴퓨터',
      onClick: () => {
        categoryEvent(3);
      },
    },
    {
      message: '건강 ∙ 취미',
      onClick: () => {
        categoryEvent(1);
      },
    },
    {
      message: '경제 ∙ 경영 ∙ 자기계발',
      onClick: () => {
        categoryEvent(2);
      },
    },
    {
      message: '과학 ∙ 기술 ∙ 컴퓨터',
      onClick: () => {
        categoryEvent(3);
      },
    },
  ];

  const openModal = kind => {
    console.log(kind);
    if (kind === 'range') {
      setRangeShowing(true);
    } else {
      setCategoryShowing(true);
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

  const { HomeWrap, TitleBox, PlusBtn } = style;
  return (
    <HomeWrap ref={modalEl}>
      <TitleBox>
        {tabContArr.map(section => {
          //대여가능, 대여중/예약중
          return section.tabTitle;
        })}
        <button onClick={() => openModal('range')}>{range}</button>
        <button onClick={() => openModal('category')}>{category}</button>
      </TitleBox>
      {tabContArr[activeIndex].tabCont}
      <PlusBtn onClick={() => navigate('/upload')} />
      {rangeShowing && <Popup title={'정렬 설정'} contents={rangeContents} />}
      {categoryShowing && <Popup title={'카테고리'} contents={categoryContents} />}
    </HomeWrap>
  );
};

export default HomePage;
