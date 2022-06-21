import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../app/headerSlice';
import style from './UploadBookPage.style';
import camera from '../../assets/img/userInterFace/Camera_enhance.png';

const UploadBookPage = () => {
  const { Wrapper, RadioBtn, OptionLabel, UploadImg, ImageContainer, InputText, OptionText } = style;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('도서 대여 글쓰기'));

    return () => {
      //
    };
  }, []);

  return (
    <Wrapper>
      <RadioBtn type={'radio'} name={'submitMethod'} checked={true} />
      <OptionLabel>도서를 검색하여 등록</OptionLabel>
      <RadioBtn type={'radio'} name={'submitMethod'} />
      <OptionLabel>직접 도서 정보 입력</OptionLabel>
      <ImageContainer>
        <UploadImg src={camera}></UploadImg>
      </ImageContainer>
      {/* <input accept=”image/*” id=”icon-button-file” type=”file” capture=”environment”/> */}
      <InputText placeholder="도서 제목"></InputText>
      <InputText placeholder="저자명"></InputText>
      <OptionText>카테고리</OptionText>
      <OptionText>책 상태 등급</OptionText>
    </Wrapper>
  );
};

export default UploadBookPage;
