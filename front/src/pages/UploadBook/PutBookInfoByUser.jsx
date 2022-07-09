/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './PutBookInfoByUser.style';
import camera from '../../assets/img/userInterFace/Camera_enhance.png';
import SelectPopupBottom from '../../components/Modal/SelectPopupBottom';
import bookApi from '../../util/BookApi';
import { setSave, setAllFalse } from '../../app/headerSlice';

const PutBookInfoByUser = () => {
  const { Wrapper, UploadImg, ImageContainer, InputText, OptionText } = style;
  const [title, setTitle] = useState('');
  const [contentList, setContentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [bookLevel, setBookLevel] = useState();
  const [currentCategory, setCurrentCategory] = useState();
  const { getCategoryList } = bookApi;
  const dispatch = useDispatch();
  const bookLevelList = ['A', 'B', 'C'];

  useEffect(() => {
    getCategoryList(setCategoryList);
    dispatch(setAllFalse());
    dispatch(setSave(true));
    return () => {};
  }, []);

  const showCategoryModal = () => {
    setTitle('카테고리');
    const categoryOnclickList = [];
    categoryList.map(item =>
      categoryOnclickList.push({
        onClick: () => {
          setCurrentCategory(item.name);
          setShowModal(false);
        },
        message: item.name,
      }),
    );
    setContentList([...categoryOnclickList]);
    setShowModal(true);
  };

  const showBookLevel = () => {
    const levelList = [];
    bookLevelList.map(item =>
      levelList.push({
        onClick: () => {
          setBookLevel(item);
          setShowModal(false);
        },
        message: item,
      }),
    );
    setTitle('책 상태 등급');
    setContentList([...levelList]);
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
