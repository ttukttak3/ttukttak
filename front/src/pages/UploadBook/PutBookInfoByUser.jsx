/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import style from './PutBookInfoByUser.style';
import camera from '../../assets/img/userInterFace/Camera_enhance.png';
import expand_more from '../../assets/img/arrows/expand_more.png';
import SelectPopupBottom from '../../components/Modal/SelectPopupBottom';
import bookApi from '../../util/BookApi';
import { setAllFalse } from '../../app/headerSlice';

const PutBookInfoByUser = () => {
  const { Wrapper, UploadImg, ImageContainer, InputText, UplodedImg, OptionText, ImgBox, SaveButton, CountImg } = style;
  const [title, setTitle] = useState('');
  const [contentList, setContentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [bookGrade, setBookGrade] = useState('');
  const [bookTitle, setBookTitle] = useState();
  const [bookAuthor, setBookAuthor] = useState();
  const [deposit, setDeposit] = useState();
  const [bookImg, setBookImg] = useState('');
  const [description, setDescription] = useState();
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState('');
  const { getCategoryList, uploadBook } = bookApi;
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [imgFiles, setImgFiles] = useState([]);
  const [imgPreviews, setImgPreviews] = useState([]);
  const bookGradeList = ['A', 'B', 'C'];

  useEffect(() => {
    getCategoryList(setCategoryList);
    dispatch(setAllFalse());
    return () => {};
  }, [dispatch, getCategoryList]);

  const showCategoryModal = () => {
    setTitle('카테고리');
    const categoryOnclickList = [];
    categoryList.map(item =>
      categoryOnclickList.push({
        onClick: () => {
          setCurrentCategory(item.id);
          setCurrentCategoryTitle(item.name);
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
        publishedDate: '',
        publisher: '',
        author: bookAuthor,
        subject: '',
        bookCategoryId: currentCategory,
        content: '',
        deposite: '',
        grade: bookGrade,
        thumbnail: bookImg,
        imageFiles: bookImg,
      };
      console.log(saveData);
      uploadBook(saveData);
    }
  };

  const onChangeImg = e => {
    e.preventDefault();
    inputRef.current.click();
  };

  const saveImage = async e => {
    e.preventDefault();
    const files = e.target.files;
    console.log(files);
    if (files.length > 0) {
      console.log(files.length);
      await Promise.all(
        [...files].map(async file => {
          const fileContents = await handleChosenFile(file);
          return fileContents;
        }),
      );
    }
  };
  const handleChosenFile = async file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setImgFiles([...imgFiles, file]);
        setImgPreviews([...imgPreviews, fileReader.result]); //promise 두개가 동시에 처리돼서 하나만 보이는중,,
      };
    });
  };

  return (
    <Wrapper>
      <ImageContainer>
        <ImgBox>
          <UploadImg src={camera} onClick={onChangeImg}></UploadImg>
          <input type="file" accept="image/*" multiple capture="camera" ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
          <CountImg>0/3</CountImg>
        </ImgBox>
        {imgPreviews.map((index, item) => (
          <UplodedImg src={item} key={index} />
        ))}
      </ImageContainer>
      <InputText placeholder="도서 제목" value={bookTitle} onChange={e => setBookTitle(e.target.value)}></InputText>
      <InputText placeholder="저자명" value={bookAuthor} onChange={e => setBookAuthor(e.target.value)}></InputText>
      <OptionText onClick={() => showCategoryModal()}>
        {currentCategoryTitle.length > 0 ? currentCategoryTitle : '카테고리'}
        <img src={expand_more} alt={'카테고리 선택'}></img>
      </OptionText>
      <OptionText onClick={() => showBookGrade()}>
        {bookGrade.length > 0 ? bookGrade : '책 상태 등급'}
        <img src={expand_more} alt={'책 상태 등급 선택'}></img>
      </OptionText>
      <InputText placeholder="보증금" value={deposit} onChange={e => setDeposit(e.target.value)}></InputText>
      <InputText placeholder="책에 대한 설명이나 느낀점을 소개해주세요." value={description} onChange={e => setDescription(e.target.value)}></InputText>
      {showModal && <SelectPopupBottom title={title} contents={contentList} />}
      <SaveButton onClick={() => saveBookInfo()}>완료</SaveButton>
    </Wrapper>
  );
};

export default PutBookInfoByUser;
