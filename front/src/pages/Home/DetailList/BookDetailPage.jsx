/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setAllFalse, setBack, setFavorite, setShare, setMore, setMoreBookId } from '../../../app/headerSlice';
import bookApi from '../../../util/BookApi';
import messageApi from '../../../util/MessageApi';
import style from './BookDetailPage.style';
import LenderInfoPage from './LenderInfoPage';
import expandMore from '../../../assets/img/arrows/expand_more.png';
import smallDown from '../../../assets/img/arrows/small_down.png';
//import ReviewPage from './ReviewPage';
//import OtherLendersPage from './OtherLendersPage';
import SelectPopup from '../../../components/Modal/SelectPopupBottom';
const BookDetailPage = () => {
  const location = useLocation();
  const bookId = location.state.id;
  const { getDetailView, updateBookGrade, updateBookStatus } = bookApi;
  const { makeChatRoom } = messageApi;

  const dispatch = useDispatch();
  const [detailView, setDetailView] = useState({
    subject: '',
    content: '',
    thumbnail: '',
    grade: '',
    deposit: '',
    rating: '',
    rentCnt: '',
  });

  const [owner, setOwner] = useState({
    address: '',
    id: '',
    imageUrl: '',
    nickName: '',
  });

  //userSlice userId값과 상세도서 api 등록 id 값 같을 시 이벤트
  const userId = useSelector(state => state.user.userId);

  //-------------- Header & Footer Off --------------
  useEffect(() => {
    getDetailView(bookId).then(result => {
      let title = '';
      if (result.bookInfo.name === null) {
        title = result.subject;
      } else {
        title = result.bookInfo.name;
      }
      setDetailView({
        name: title,
        author: result.bookInfo.author,
        publisher: result.bookInfo.publisher,
        content: result.content,
        thumbnail: result.thumbnail.imageUrl,
        grade: result.grade,
        deposit: result.deposit,
        rating: result.rating,
        rentCnt: result.rentCnt,
        status: result.status,
      });
      setOwner({
        address: result.owner.address,
        id: result.owner.id,
        imageUrl: result.owner.imageUrl,
        nickName: result.owner.nickname,
      });
    });
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setFavorite(true));
    dispatch(setShare(true));
    dispatch(setMore(true));
    dispatch(setMoreBookId(bookId));
    return () => {};
  }, [dispatch, getDetailView, bookId]);

  // 콤마
  const chgDeposit = detailView.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // popup
  const [rentalShowing, setRentalShowing] = useState(false);
  const [bookShowing, setBookShowing] = useState(false);
  const openModal = kind => {
    if (kind === 'rental') {
      setRentalShowing(true);
      document.body.style.overflow = 'hidden';
    } else if (kind === 'book') {
      setBookShowing(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const bookContents = [
    {
      message: 'A',
      onClick: () => {
        //콘솔은 toast 팝업으로 변경될 예정
        updateBookGrade(bookId, 'A').then(setDetailView({ ...detailView, grade: 'A' }), console.log('책 상태가 변경되었습니다.'));
      },
    },
    {
      message: 'B',
      onClick: () => {
        updateBookGrade(bookId, 'B').then(setDetailView({ ...detailView, grade: 'B' }), console.log('책 상태가 변경되었습니다.'));
      },
    },
    {
      message: 'C',
      onClick: () => {
        updateBookGrade(bookId, 'C').then(setDetailView({ ...detailView, grade: 'C' }), console.log('책 상태가 변경되었습니다.'));
      },
    },
  ];

  const rentalContents = [
    {
      message: '대여가능',
      onClick: () => {
        //콘솔은 toast 팝업으로 변경될 예정
        updateBookStatus(bookId, 'ABLE').then(setDetailView({ ...detailView, status: 'ABLE' }), console.log('대여 상태가 변경되었습니다.'));
      },
    },
    {
      message: '대여중',
      onClick: () => {
        updateBookStatus(bookId, 'ING').then(setDetailView({ ...detailView, status: 'ING' }), console.log('대여 상태가 변경되었습니다.'));
      },
    },
    {
      message: '예약중',
      onClick: () => {
        updateBookStatus(bookId, 'ON').then(setDetailView({ ...detailView, status: 'ON' }), console.log('대여 상태가 변경되었습니다.'));
      },
    },
  ];

  //close popup
  const modalEl = useRef(null);
  const handleClickOutside = ({ target }) => {
    if (bookShowing && !modalEl.current.contains(target)) setBookShowing(false);
    else if (rentalShowing && !modalEl.current.contains(target)) setRentalShowing(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const { Wrap, BookWrap, BookInfo, TitleBox, BookSlideBox, BookCont, BookState, BookFooter, FooterBox, LeftBox, BookPrice } = style;
  return (
    <Wrap ref={modalEl}>
      <BookWrap>
        <BookInfo>
          <TitleBox>
            <h2>{detailView.name}</h2>
            <h6>
              {detailView.author}(지은이) / {detailView.publisher}
            </h6>
          </TitleBox>
          <BookSlideBox>
            <img src={detailView.thumbnail} alt="" />
            {userId === owner.id ? (
              <button onClick={() => openModal('book')}>
                상태 {detailView.grade} {userId === owner.id ? <img src={expandMore} alt="버튼" /> : ''}
              </button>
            ) : (
              <button className="noCursor">상태 {detailView.grade}</button>
            )}
          </BookSlideBox>
          <BookCont>
            <h4>대여자의 말</h4>
            <p>{detailView.content}</p>
          </BookCont>
          <BookState>
            <p className="bookmark">{detailView.rating}</p>
            <p className="loanCount">{detailView.rentCnt}명 빌림</p>
          </BookState>
        </BookInfo>
        <LenderInfoPage owner={owner} />
        {/* <ReviewPage />
        <OtherLendersPage /> */}
      </BookWrap>
      <BookFooter>
        <FooterBox>
          <LeftBox>
            {userId === owner.id && detailView.status === 'ABLE' ? (
              <span className="bigBlue" onClick={() => openModal('rental')}>
                대여가능 <img src={smallDown} alt="버튼" />
              </span>
            ) : userId !== owner.id && detailView.status === 'ABLE' ? (
              <span className="blue">대여가능</span>
            ) : userId === owner.id && detailView.status === 'ON' ? (
              <span className="bigGray" onClick={() => openModal('rental')}>
                예약중 <img src={smallDown} alt="버튼" />
              </span>
            ) : userId !== owner.id && detailView.status === 'ON' ? (
              <span className="gray">예약중</span>
            ) : userId === owner.id && detailView.status === 'ING' ? (
              <span className="bigOrange" onClick={() => openModal('rental')}>
                대여중 <img src={smallDown} alt="버튼" />
              </span>
            ) : userId !== owner.id && detailView.status === 'ING' ? (
              <span className="orange">대여중</span>
            ) : (
              ''
            )}
            <BookPrice>
              <div>
                <p>대여료</p>
                <p>2,000원</p>
              </div>
              <div>
                <p>보증금</p>
                <p>{chgDeposit}원</p>
              </div>
            </BookPrice>
          </LeftBox>
          <button onClick={() => makeChatRoom(bookId, userId)}>채팅하기</button>
        </FooterBox>
      </BookFooter>
      {/* popup */}
      {bookShowing && <SelectPopup title={'책 상태 변경'} contents={bookContents} />}
      {rentalShowing && <SelectPopup title={'대여 상태 변경'} contents={rentalContents} />}
    </Wrap>
  );
};

export default BookDetailPage;
