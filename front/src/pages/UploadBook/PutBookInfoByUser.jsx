/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import style from './PutBookInfoByUser.style';
import camera from '../../assets/img/userInterFace/Camera_enhance.png';
import expand_more from '../../assets/img/arrows/expand_more.png';
import SelectPopupBottom from '../../components/Modal/SelectPopupBottom';
import bookApi from '../../util/BookApi';
import { setAllFalse } from '../../app/headerSlice';
import ConfirmPopup from '../../components/Modal/ConfirmPopup';
import { useNavigate } from 'react-router-dom';

const PutBookInfoByUser = () => {
  const { Wrapper, UploadImg, ImageContainer, InputText, UplodedImg, OptionText, ImgBox, SaveButton, CountImg, VerticalScrollWrapper } = style;
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

  const bookGradeList = ['A', 'B', 'C'];
  const [confirmTitle, setConfirmTitle] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirmBtns, setConfirmBtns] = useState();
  const navigate = useNavigate();
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

  const saveBookInfo = async () => {
    if (!bookTitle && !bookAuthor && !currentCategory && !bookGrade) {
      alert('도서 제목, 저자명, 카테고리, 도서 상태 등급은 필수 입력 항목이에요.');
    } else {
      const saveData = {
        description: description,
        image: '',
        isbn: '',
        name: bookTitle,
        price: 0,
        publishedDate: '',
        publisher: '',
        author: bookAuthor,
        subject: bookTitle,
        bookCategoryId: currentCategory,
        content: description,
        deposite: deposit,
        grade: bookGrade,
        thumbnail: imgFiles[0].name,
        imageFiles: imgFiles,
      };
      console.log(saveData);

      const bookId = await uploadBook(saveData);
      console.log(bookId);
      confirmClose();
      navigate(`/detailBook`, { state: { id: bookId } });
    }
  };

  const onSaveHandler = () => {
    setConfirmTitle('작성을 완료 하시겠습니까?');
    setConfirmBtns([
      { onClick: confirmClose, message: '취소' },
      { onClick: saveBookInfo, message: '확인' },
    ]);
    setIsConfirm(true);
  };

  const confirmClose = () => {
    setIsConfirm(false);
  };

  const onChangeImg = e => {
    e.preventDefault();
    inputRef.current.click();
  };

  const [firstPicPreview, setFirstPicPreview] = useState('');
  const [secondPicPreview, setSecondPicPreview] = useState('');
  const [thirdPicPreview, setThirdPicPreview] = useState('');
  const [imgFiles, setImgFiles] = useState([]);

  const saveImage = e => {
    e.preventDefault();
    const files = e.target.files;
    setImgFiles(files);

    const fileReader1 = new FileReader();
    if (files[0]) {
      fileReader1.readAsDataURL(files[0]);
      fileReader1.onload = () => {
        setFirstPicPreview(fileReader1.result);
      };
    }

    const fileReader2 = new FileReader();
    if (files[1]) {
      fileReader2.readAsDataURL(files[1]);
      fileReader2.onload = () => {
        setSecondPicPreview(fileReader2.result);
      };
    }

    const fileReader3 = new FileReader();
    if (files[2]) {
      fileReader3.readAsDataURL(files[2]);
      fileReader3.onload = () => {
        setThirdPicPreview(fileReader3.result);
      };
    }
  };

  return (
    <Wrapper>
      <ImageContainer>
        <VerticalScrollWrapper>
          <ImgBox>
            <UploadImg src={camera} onClick={onChangeImg}></UploadImg>
            <input type="file" accept="image/*" multiple capture="camera" ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
            <CountImg>0/3</CountImg>
          </ImgBox>
          {firstPicPreview !== '' && <UplodedImg src={firstPicPreview} />}
          {secondPicPreview !== '' && <UplodedImg src={secondPicPreview} />}
          {thirdPicPreview !== '' && <UplodedImg src={thirdPicPreview} />}
        </VerticalScrollWrapper>
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
      <SaveButton onClick={() => onSaveHandler()}>완료</SaveButton>
      {isConfirm && <ConfirmPopup title={confirmTitle} contents={confirmBtns} />}
    </Wrapper>
  );
};

export default PutBookInfoByUser;
