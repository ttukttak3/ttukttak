import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle, setAllFalse, setBack } from '../../app/headerSlice';
import { useLocation } from 'react-router-dom';
import style from './UpdateBookPage.style';
import bookApi from '../../util/BookApi';
import UpdateApiBookInfoPage from './UpdateApiBookInfoPage';
import UpdateBookInfoPage from './UpdateBookInfoPage';

const UpdateBookPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const bookId = location.state.id;
  const [radioOpt, setRadioOpt] = useState();
  const { getCategoryList, getDetailView } = bookApi;
  const [categoryList, setCategoryList] = useState([]);
  const [bookInfo, setBookInfo] = useState();

  useEffect(() => {
    localStorage.setItem('url', `/update/${bookId}`);
    dispatch(setAllFalse());
    dispatch(setTitle('도서 대여 글쓰기 수정'));
    dispatch(setBack(true));
    getCategoryList(setCategoryList);
    getDetailView(bookId).then(result => {
      setBookInfo(result);
      setRadioOpt(result.bookInfo.isbn);
    });
  }, [dispatch, bookId, getCategoryList, getDetailView]);

  const handleRadio = e => {};

  const { Wrapper, RadioOptBox, Option } = style;

  return (
    <Wrapper>
      <RadioOptBox>
        <Option>
          <input type={'radio'} checked={radioOpt !== null} name={'submitMethod'} onChange={handleRadio} />
          <span>도서를 검색하여 등록</span>
        </Option>
        <Option>
          <input type={'radio'} checked={radioOpt === null} name={'submitMethod'} onChange={handleRadio} />
          <span>직접 도서 정보 등록</span>
        </Option>
      </RadioOptBox>
      {radioOpt === null
        ? //직접등록
          bookInfo && <UpdateBookInfoPage categoryList={categoryList} bookInfo={bookInfo}></UpdateBookInfoPage>
        : //API조회 등록
          bookInfo && <UpdateApiBookInfoPage categoryList={categoryList} bookInfo={bookInfo} item={bookInfo.bookInfo}></UpdateApiBookInfoPage>}
    </Wrapper>
  );
};

export default UpdateBookPage;
