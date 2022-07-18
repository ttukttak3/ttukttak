/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setAllFalse, setBack, setFavorite, setShare, setMore } from '../../../app/headerSlice';
import bookApi from '../../../util/BookApi';
import style from './BookDetailPage.style';
import LenderInfoPage from './LenderInfoPage';
//import ReviewPage from './ReviewPage';
//import OtherLendersPage from './OtherLendersPage';
//import SelectPopup from '../../../components/Modal/SelectPopupBottom';
//import ConfirmPopup from '../../../components/Modal/ConfirmPopup';
const BookDetailPage = () => {
  const location = useLocation();
  const bookId = location.state.id;
  const { getDetailView } = bookApi;

  const dispatch = useDispatch();
  const [detailView, setDetailView] = useState({
    subject: '2022 간호사 국가고시 5일 완성 파이널 모의고사',
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
      setDetailView({
        subject: result.subject,
        content: result.content,
        thumbnail: result.thumbnail.imageUrl,
        grade: result.grade,
        deposit: result.deposit,
        rating: result.rating,
        rentCnt: result.rentCnt,
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
    return () => {};
  }, [dispatch, getDetailView, bookId]);

  // 콤마
  const chgDeposit = detailView.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // popup
  // const [rentalStatusShowing, setRentalStatusShowing] = useState(false);
  // const [bookStastusShowing, setBookStatusShowing] = useState(false);
  // const [moreShowing, setMoreShowing] = useState(false);
  // const [bookDeleteShowing, setBookDeleteShowing] = useState(false);

  // const openModal = kind => {
  //   if (kind === 'rental') {
  //     setRentalStatusShowing(true);
  //     document.body.style.overflow = 'hidden';
  //   } else if (kind === 'book') {
  //     setBookStatusShowing(true);
  //     document.body.style.overflow = 'hidden';
  //   } else if (kind === 'more') {
  //     setMoreShowing(true);
  //     document.body.style.overflow = 'hidden';
  //   } else if (kind === 'delete') {
  //     setBookDeleteShowing(true);
  //     document.body.style.overflow = 'hidden';
  //   }
  // };
  const { Wrap, BookWrap, BookInfo, TitleBox, BookSlideBox, BookCont, BookState, BookFooter, FooterBox, LeftBox, BookPrice } = style;
  return (
    <Wrap>
      <BookWrap>
        <BookInfo>
          <TitleBox>
            <h2>{detailView.subject}</h2>
            <h6>김상현(지은이) / 필름</h6>
          </TitleBox>
          <BookSlideBox>
            <img src={detailView.thumbnail} alt="" />
            <button>{detailView.grade}</button>
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
        <LenderInfoPage content={owner} />
        {/* <ReviewPage />
        <OtherLendersPage /> */}
      </BookWrap>
      <BookFooter>
        <FooterBox>
          <LeftBox>
            <span className="blue">대여가능</span>
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
          <button>채팅하기</button>
        </FooterBox>
      </BookFooter>
      {/* <SelectPopup title={'Test'} />
      <ConfirmPopup contents={'Test'} /> */}
    </Wrap>
  );
};

export default BookDetailPage;
