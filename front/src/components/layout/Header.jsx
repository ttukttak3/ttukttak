/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './Header.style';
import keyboardArrowLeft from '../../assets/img/arrows/Keyboard_arrow_left.svg';
import expandMore from '../../assets/img/arrows/expand_more.svg';
import searchImg from '../../assets/img/userInterFace/Search.svg';
import favoriteBorder from '../../assets/img/userInterFace/Favorite_border.svg';
import notifications from '../../assets/img/userInterFace/Notifications.svg';
//import notificationsOn from '../../assets/img/userInterFace/Notifications_On.svg';
import trashCan from '../../assets/img/userInterFace/Trash_Can.svg';
import shareImg from '../../assets/img/userInterFace/share.svg';
import moreVert from '../../assets/img/userInterFace/more_vert.svg';
import settingsImg from '../../assets/img/userInterFace/Settings.png';
import clearGray from '../../assets/img/userInterFace/Clear_gray.svg';
import SelectPopup from '../../components/Modal/SelectPopupBottom';
import ConfirmPopup from '../../components/Modal/ConfirmPopup';
import bookApi from '../../util/BookApi';
const Header = () => {
  const navigate = useNavigate();
  const header = useSelector(state => state.header);
  const { title, back, backHome, location, search, favorite, alert, trash, share, more, moreBookId, settings, locationBox, placeholder } = header;
  const { HeaderBox, LeftBox, Title, BackBtn, DownBtn, RightBox, RightBtn, LocationBox } = style;

  // 포스트보기 더보기 클릭 popup
  const { bookDelete } = bookApi;
  const [moreShowing, setMoreShowing] = useState(false);
  const [bookDeleteShowing, setBookDeleteShowing] = useState(false);

  const openModal = () => {
    setMoreShowing(true);
  };
  const moreContents = [
    {
      message: '포스트 수정하기',
      onClick: () => {
        //도서 등록으로 이동
      },
    },
    {
      message: '포스트 숨기기',
      onClick: () => {
        //
      },
    },
    {
      message: '포스트 삭제하기',
      onClick: () => {
        setBookDeleteShowing(true);
      },
    },
  ];

  const deleteContents = [
    {
      message: '취소',
      onClick: () => {
        setBookDeleteShowing(false);
      },
    },
    {
      message: '확인',
      onClick: () => {
        //문구는 toast 팝업으로 바꿀 예정
        bookDelete(moreBookId).then(console.log('삭제했습니다.'));
      },
    },
  ];

  //close popup
  const modalEl = useRef(null);
  const handleClickOutside = ({ target }) => {
    if (moreShowing && !modalEl.current.contains(target)) setMoreShowing(false);
    else if (bookDeleteShowing && !modalEl.current.contains(target)) setBookDeleteShowing(false);
  };
  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  //나의책방 > 프로필 수정 > 위치 검색
  const [visible, setVisible] = useState(false);
  const handleChangeInputText = e => {
    if (e.target.value) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleClickClearBtn = () => {
    document.getElementById('searchInput').value = '';
    setVisible(false);
  };

  return (
    <HeaderBox ref={modalEl}>
      <LeftBox>
        {back && (
          <BackBtn onClick={() => navigate(-1)}>
            <img src={keyboardArrowLeft} alt={'뒤로가기'} />
          </BackBtn>
        )}
        {backHome && (
          <BackBtn onClick={() => navigate(`/`)}>
            <img src={keyboardArrowLeft} alt={'홈'} />
          </BackBtn>
        )}
        {location === true ? (
          <Title className="titleLocation" onClick={() => navigate(`/location/${JSON.parse(localStorage.getItem('town')).id}`)}>
            {title}
          </Title>
        ) : (
          <Title>{title}</Title>
        )}
        {location && (
          <DownBtn>
            <img src={expandMore} alt={'위치목록'} onClick={() => navigate(`/location/${JSON.parse(localStorage.getItem('town')).id}`)} />
          </DownBtn>
        )}
        {locationBox && (
          <LocationBox>
            <input id="searchInput" placeholder={placeholder} onChange={handleChangeInputText} />
            <button id="clearBtn" className={visible ? 'active' : 'hide'} onClick={handleClickClearBtn}>
              <img src={clearGray} alt={'초기화버튼'} />
            </button>
            <button id="searchBtn">
              <img src={searchImg} alt={'검색버튼'} />
            </button>
          </LocationBox>
        )}
      </LeftBox>
      <RightBox>
        {search && (
          <RightBtn>
            <img src={searchImg} alt={'검색버튼'} />
          </RightBtn>
        )}
        {favorite && (
          <RightBtn>
            <img src={favoriteBorder} alt={'북마크버튼'} />
          </RightBtn>
        )}
        {trash && (
          <RightBtn>
            <img src={trashCan} alt={'삭제버튼'} />
          </RightBtn>
        )}
        {alert && (
          <RightBtn onClick={() => navigate(`/chat/alert`)}>
            <img src={notifications} alt={'알림목록'} />
          </RightBtn>
        )}
        {share && (
          <RightBtn>
            <img src={shareImg} alt={'공유하기버튼'} />
          </RightBtn>
        )}
        {more && (
          <RightBtn onClick={() => openModal()}>
            <img src={moreVert} alt={'더보기버튼'} />
          </RightBtn>
        )}
        {settings && (
          <RightBtn>
            <img src={settingsImg} alt={'설정버튼'} />
          </RightBtn>
        )}
      </RightBox>
      {/* popup */}
      {moreShowing && <SelectPopup title={'더보기'} contents={moreContents} />}
      {bookDeleteShowing && <ConfirmPopup title={'포스트를 삭제하시겠습니까?'} contents={deleteContents} />}
    </HeaderBox>
  );
};

export default Header;
