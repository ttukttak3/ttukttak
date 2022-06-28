/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import style from './PutBookInfoByUser.style';
import camera from '../../assets/img/userInterFace/Camera_enhance.png';
import SelectPopupBottom from '../../components/Modal/SelectPopupBottom';

const PutBookInfoByUser = () => {
  const { Wrapper, UploadImg, ImageContainer, InputText, OptionText } = style;
  const [title, setTitle] = useState('');
  const [contentList, setContentList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const showCategoryModal = () => {
    setTitle('카테고리');
    setContentList(); //카테고리 내역 data front에서만?
    setShowModal(true);
  };

  const showBookLevel = () => {
    const levelList = [
      {
        onClick: () => {
          setShowModal(false);
        },
        message: 'A',
      },
      {
        onClick: () => {
          setShowModal(false);
        },
        message: 'B',
      },
      {
        onClick: () => {
          setShowModal(false);
        },
        message: 'C',
      },
    ];
    setTitle('책 상태 등급');
    setContentList([...contentList, ...levelList]);
    setShowModal(true);
  };

  return (
    <Wrapper>
      <ImageContainer>
        <UploadImg src={camera}></UploadImg>
      </ImageContainer>
      <input type="file" accept="image/*" capture="camera" />
      <InputText placeholder="도서 제목"></InputText>
      <InputText placeholder="저자명"></InputText>
      <OptionText onClick={() => showCategoryModal()}>카테고리</OptionText>
      <OptionText onClick={() => showBookLevel()}>책 상태 등급</OptionText>
      <InputText placeholder="보증금"></InputText>
      <InputText placeholder="책에 대한 설명이나 느낀점을 소개해주세요."></InputText>
      {showModal && <SelectPopupBottom title={title} contents={contentList} />}
    </Wrapper>
  );
};

export default PutBookInfoByUser;
