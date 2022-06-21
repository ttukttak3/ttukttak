import React from 'react';
import style from './PutBookInfoByUser.style';
import camera from '../../assets/img/userInterFace/Camera_enhance.png';

const PutBookInfoByUser = () => {
  const { Wrapper, UploadImg, ImageContainer, InputText, OptionText } = style;

  return (
    <Wrapper>
      <ImageContainer>
        <UploadImg src={camera}></UploadImg>
      </ImageContainer>
      {/* <input accept=”image/*” id=”icon-button-file” type=”file” capture=”environment”/> */}
      <InputText placeholder="도서 제목"></InputText>
      <InputText placeholder="저자명"></InputText>
      <OptionText>카테고리</OptionText>
      <OptionText>책 상태 등급</OptionText>
      <InputText placeholder="보증금"></InputText>
      <InputText placeholder="책에 대한 설명이나 느낀점을 소개해주세요."></InputText>
    </Wrapper>
  );
};

export default PutBookInfoByUser;
