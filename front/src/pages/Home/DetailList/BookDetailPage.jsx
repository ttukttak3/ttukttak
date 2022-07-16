import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllFalse, setBack, setFavorite, setShare, setMore } from '../../../app/headerSlice';
import style from './BookDetailPage.style';
import LenderInfoPage from './LenderInfoPage';
import ReviewPage from './ReviewPage';
import OtherLendersPage from './OtherLendersPage';
const BookDetailPage = () => {
  const dispatch = useDispatch();
  //userSlice userId값과 도서등록 id 값 같을 시 이벤트
  const userId = useSelector(state => state.user.userId);
  console.log(userId);
  //-------------- Header & Footer Off --------------
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setFavorite(true));
    dispatch(setShare(true));
    dispatch(setMore(true));
    return () => {};
  }, [dispatch]);

  const { DetailWrap, BookInfo, TitleBox, BookSlideBox, BookCont, BookState } = style;
  return (
    <DetailWrap>
      <BookInfo>
        <TitleBox>
          <h2>2022 간호사 국가고시 5일 완성 파이널 모의고사</h2>
          <h6>김상현(지은이) / 필름</h6>
        </TitleBox>
        <BookSlideBox>냥</BookSlideBox>
        <BookCont>
          <h4>대여자의 말</h4>
          <p>풀리지 않을 고민을 안고 있을 청춘이라서, 그 시간 위에 살고 있는 동시대 의 사람으로서 인간관계와 행복에 대해 짙은 감성을 더하여 섬세하면서 부 드럽게 풀어내고 있다.</p>
        </BookCont>
        <BookState>
          <p className="bookmark">0</p>
          <p className="loanCount">0</p>
        </BookState>
      </BookInfo>
      <LenderInfoPage />
      <ReviewPage />
      <OtherLendersPage />
    </DetailWrap>
  );
};

export default BookDetailPage;
