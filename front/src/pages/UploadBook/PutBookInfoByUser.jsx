/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './PutBookInfoByUser.style';
import camera from '../../assets/img/userInterFace/Camera_enhance.png';
import SelectPopupBottom from '../../components/Modal/SelectPopupBottom';
import bookApi from '../../util/BookApi';
import { setAllFalse } from '../../app/headerSlice';

const PutBookInfoByUser = () => {
  const { Wrapper, UploadImg, ImageContainer, InputText, OptionText, SaveButton } = style;
  const [title, setTitle] = useState('');
  const [contentList, setContentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [bookGrade, setBookGrade] = useState();
  const [bookTitle, setBookTitle] = useState();
  const [bookAuthor, setBookAuthor] = useState();
  const [deposit, setDeposit] = useState();
  const [bookImg, setBookImg] = useState();
  const [description, setDescription] = useState();
  const [currentCategory, setCurrentCategory] = useState();
  const { getCategoryList, uploadBook } = bookApi;
  const dispatch = useDispatch();
  const bookGradeList = ['A', 'B', 'C'];

  useEffect(() => {
    getCategoryList(setCategoryList);
    dispatch(setAllFalse());
    return () => {};
  }, []);

  const showCategoryModal = () => {
    setTitle('카테고리');
    const categoryOnclickList = [];
    categoryList.map(item =>
      categoryOnclickList.push({
        onClick: () => {
          setCurrentCategory(item.id);
          setShowModal(false);
        },
        message: item.name,
      }),
    );
    setContentList([...categoryOnclickList]);
    setShowModal(true);
  };

  const showBookGrade = () => {
    const gradeList = [];
    bookGradeList.map(item =>
      gradeList.push({
        onClick: () => {
          setBookGrade(item);
          setShowModal(false);
        },
        message: item,
      }),
    );
    setTitle('책 상태 등급');
    setContentList([...gradeList]);
    setShowModal(true);
  };

  const saveBookInfo = () => {
    if (!bookTitle && !bookAuthor && !currentCategory && !bookGrade) {
      alert('도서 제목, 저자명, 카테고리, 도서 상태 등급은 필수 입력 항목이에요.');
    } else {
      const saveData = {
        description: description,
        image: bookImg,
        name: bookTitle,
        price: deposit,
        author: bookAuthor,
        bookCategoryId: currentCategory,
        grade: bookGrade,
        thumbnail: bookImg,
        imageFiles: bookImg,
      };
      console.log(saveData);
      uploadBook(saveData);
    }
  };

  return (
    <Wrapper>
      <ImageContainer>
        <UploadImg src={camera}></UploadImg>
      </ImageContainer>
      <input type="file" accept="image/*" capture="camera" />
      <InputText placeholder="도서 제목" value={bookTitle} onChange={e => setBookTitle(e.target.value)}></InputText>
      <InputText placeholder="저자명" value={bookAuthor} onChange={e => setBookAuthor(e.target.value)}></InputText>
      <OptionText onClick={() => showCategoryModal()}>카테고리</OptionText>
      <OptionText onClick={() => showBookGrade()}>책 상태 등급</OptionText>
      <InputText placeholder="보증금" value={deposit} onChange={e => setDeposit(e.target.value)}></InputText>
      <InputText placeholder="책에 대한 설명이나 느낀점을 소개해주세요." value={description} onChange={e => setDescription(e.target.value)}></InputText>
      {showModal && <SelectPopupBottom title={title} contents={contentList} />}
      <SaveButton value="저장" onClick={() => saveBookInfo()}></SaveButton>
    </Wrapper>
  );
};

export default PutBookInfoByUser;
