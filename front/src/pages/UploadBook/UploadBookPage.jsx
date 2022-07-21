import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../app/headerSlice';
import style from './UploadBookPage.style';
import PutBookInfoByUser from './PutBookInfoByUser';
import SearchBookPage from './SearchBookPage';

const UploadBookPage = () => {
  const { Wrapper, RadioBtn, OptionLabel, RadioOptBox, Option } = style;
  const dispatch = useDispatch();
  const [radioOpt, setRadioOpt] = useState('saveByPut');

  useEffect(() => {
    dispatch(setTitle('도서 대여 글쓰기'));

    return () => {
      //
    };
  }, [dispatch, radioOpt]);

  const handleRadio = e => {
    setRadioOpt(e.target.value);
  };

  return (
    <Wrapper>
      <RadioOptBox>
        <Option>
          <RadioBtn value={'searchToSave'} type={'radio'} name={'submitMethod'} checked={radioOpt === 'searchToSave'} onChange={handleRadio} />
          <OptionLabel>도서를 검색하여 등록</OptionLabel>
        </Option>
        <Option>
          <RadioBtn value={'saveByPut'} type={'radio'} name={'submitMethod'} checked={radioOpt === 'saveByPut'} onChange={handleRadio} />
          <OptionLabel>직접 도서 정보 입력</OptionLabel>
        </Option>
      </RadioOptBox>
      {radioOpt === 'searchToSave' ? <SearchBookPage></SearchBookPage> : <PutBookInfoByUser></PutBookInfoByUser>}
    </Wrapper>
  );
};

export default UploadBookPage;
