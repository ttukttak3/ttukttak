/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './slide.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAllFalse, setBack, setFavorite, setShare, setMore, setMoreBookId } from '../../../app/headerSlice';
import bookApi from '../../../util/BookApi';
import messageApi from '../../../util/MessageApi';
import style from './BookDetailPage.style';
import LenderInfoPage from './LenderInfoPage';
import expandMore from '../../../assets/img/arrows/expand_more.svg';
import smallDown from '../../../assets/img/arrows/small_down.svg';
import noImg from '../../../assets/img/logo/postb_default.svg';
//import ReviewPage from './ReviewPage';
//import OtherLendersPage from './OtherLendersPage';
import SelectPopup from '../../../components/Modal/SelectPopupBottom';
const BookDetailPage = () => {
  const location = useLocation();
  const bookId = location.state.id;
  const userId = useSelector(state => state.user.userId);
  const navigate = useNavigate();
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
  const [images, setImages] = useState([]);
  const [owner, setOwner] = useState({
    address: '',
    id: '',
    imageUrl: '',
    nickName: '',
  });
  //-------------- API ------------------------------
  const { getDetailView, updateBookGrade, updateBookStatus } = bookApi;
  const { makeChatRoom } = messageApi;
  //-------------- Header & Footer Off --------------
  useEffect(() => {
    getDetailView(bookId).then(result => {
      // let title = '';
      // if (result.bookInfo.name === null) {
      //   title = result.subject;
      // } else {
      //   title = result.bookInfo.name;
      // }

      setDetailView({
        name: result.subject,
        author: result.author,
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
      if (userId === result.owner.id) {
        //id 같을 시에만 더보기 버튼
        dispatch(setMore(true));
        dispatch(setMoreBookId(bookId));
      }
      if (result.bookImages.length > 0) {
        //대표 이미지가 있을 시
        if (result.thumbnail.id) {
          setImages(image => [...image, result.thumbnail]);
        }
        //대표 이미지가 없을 시 3장 모두 images에서 가져온다
        for (let i = 0; i < result.bookImages.length; i++) {
          if (result.thumbnail.id !== result.bookImages[i].id) {
            setImages(image => [...image, result.bookImages[i]]);
          }
        }
      } else {
        //이미지 없을 때
        setImages(image => [...image, { id: 0, imageUrl: noImg }]);
      }
    });
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setFavorite(true));
    dispatch(setShare(true));

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

  const chattingHandler = async () => {
    const result = await makeChatRoom(bookId, userId);
    navigate(`/chat/${result.roomId}`);
  };
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
            <Swiper modules={[Pagination]} slidesPerView={1} pagination={{ clickable: true }}>
              {images.map((image, index) => {
                return (
                  <SwiperSlide key={index}>
                    <img src={image.imageUrl} alt="" />
                    {userId === owner.id ? (
                      <button onClick={() => openModal('book')}>
                        상태 {detailView.grade} {userId === owner.id ? <img src={expandMore} alt="버튼" /> : ''}
                      </button>
                    ) : (
                      <button className="noCursor">상태 {detailView.grade}</button>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
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
        <LenderInfoPage owner={owner} userId={userId} />
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
          <button onClick={() => chattingHandler()}>채팅하기</button>
        </FooterBox>
      </BookFooter>
      {/* popup */}
      {bookShowing && <SelectPopup title={'책 상태 변경'} contents={bookContents} />}
      {rentalShowing && <SelectPopup title={'대여 상태 변경'} contents={rentalContents} />}
    </Wrap>
  );
};

export default BookDetailPage;
