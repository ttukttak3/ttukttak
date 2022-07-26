/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './PutBookInfoByUser.style';
import camera from '../../assets/img/userInterFace/local_see.svg';
import expand_more from '../../assets/img/arrows/expand_more.svg';
import bookApi from '../../util/BookApi';
import { setAllFalse } from '../../app/headerSlice';
import ConfirmPopup from '../../components/Modal/ConfirmPopup';
import SelectPopupBottom from '../../components/Modal/SelectPopupBottom';

const PutBookInfoByUser = ({ categoryList }) => {
  const { Wrapper, UploadImg, ImageContainer, InputText, UplodedImg, OptionText, ImgBox, SaveButton, CountImg, VerticalScrollWrapper } = style;
  const [modalTitle, setModalTitle] = useState('');
  const [contentList, setContentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookGrade, setBookGrade] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [deposit, setDeposit] = useState();
  const [review, setReview] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState('');
  const { uploadBook } = bookApi;
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const bookGradeList = ['A', 'B', 'C'];
  const [confirmTitle, setConfirmTitle] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirmBtns, setConfirmBtns] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setAllFalse());
    return () => {};
  }, [dispatch]);

  const showCategoryModal = () => {
    setModalTitle('카테고리');
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
    setModalTitle('책 상태 등급');
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
    setContentList([...gradeList]);
    setShowModal(true);
  };

  const saveBookInfo = async () => {
    if (!bookTitle && !bookAuthor && !currentCategory && !bookGrade) {
      alert('도서 제목, 저자명, 카테고리, 도서 상태 등급은 필수 입력 항목이에요.');
    } else {
      const formData = new FormData();
      formData.append('subject', bookTitle);
      formData.append('author', bookAuthor);
      formData.append('bookCategoryId', currentCategory);
      formData.append('content', review);
      formData.append('deposit', deposit);
      formData.append('grade', bookGrade);
      formData.append('thumbnail', imgFiles[0].name);

      for (let i = 0; i < imgFiles.length; i++) {
        formData.append('imageFiles', imgFiles[i]);
      }

      const bookId = await uploadBook(formData);
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

  const [imgFiles, setImgFiles] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const saveImage = e => {
    e.preventDefault();
    const files = e.target.files;

    for (let i = 0; i < 3; i++) {
      if (files[i] && imgPreview.length < 3) {
        setImgFiles(file => [...file, files[i]]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[i]);
        fileReader.onload = () => {
          setImgPreview(preview => [...preview, fileReader.result]);
        };
      }
    }
  };

  return (
    <Wrapper>
      <ImageContainer>
        <VerticalScrollWrapper>
          <ImgBox>
            <input type="file" accept="image/*" multiple ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
            <UploadImg src={camera} onClick={onChangeImg}></UploadImg>
            <CountImg>{imgPreview.length}/3</CountImg>
          </ImgBox>
          {imgPreview
            ? imgPreview.map((preview, index) => {
                return <UplodedImg key={index} src={preview} />;
              })
            : ''}
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
      <InputText placeholder="책에 대한 설명이나 느낀점을 소개해주세요." value={review} onChange={e => setReview(e.target.value)}></InputText>
      {showModal && <SelectPopupBottom title={modalTitle} contents={contentList} />}
      <SaveButton onClick={() => onSaveHandler()}>완료</SaveButton>
      {isConfirm && <ConfirmPopup title={confirmTitle} contents={confirmBtns} />}
    </Wrapper>
  );
};

export default PutBookInfoByUser;
