import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle, setAllFalse, setBackX } from '../../app/headerSlice';
import style from './UploadBookPage.style';
import PutBookInfoByUser from './PutBookInfoByUser';
import SearchBookPage from './SearchBookPage';
import bookApi from '../../util/BookApi';

const UploadBookPage = () => {
  const { Wrapper, RadioOptBox, Option } = style;
  const dispatch = useDispatch();
  const [radioOpt, setRadioOpt] = useState('searchToSave');
  const { getCategoryList } = bookApi;
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    localStorage.setItem('url', '/upload');
    dispatch(setAllFalse());
    dispatch(setTitle('도서 대여 글쓰기'));
    dispatch(setBackX(true));
    getCategoryList(setCategoryList);
  }, [dispatch, radioOpt, getCategoryList]);

  const handleRadio = e => {
    setRadioOpt(e.target.value);
  };

  return (
    <Wrapper>
      <RadioOptBox>
        <Option>
          <input type="radio" id="searchBtn" name="submitMethod" value={'searchToSave'} checked={radioOpt === 'searchToSave'} onChange={handleRadio} />
          <label htmlFor="searchBtn">도서를 검색하여 등록</label>
        </Option>
        <Option>
          <input type="radio" id="putBtn" name="submitMethod" value={'saveByPut'} checked={radioOpt === 'saveByPut'} onChange={handleRadio} />
          <label htmlFor="putBtn">직접 도서 정보 입력</label>
        </Option>
      </RadioOptBox>
      {radioOpt === 'searchToSave' ? <SearchBookPage categoryList={categoryList}></SearchBookPage> : <PutBookInfoByUser categoryList={categoryList}></PutBookInfoByUser>}
    </Wrapper>
  );
};

export default UploadBookPage;
