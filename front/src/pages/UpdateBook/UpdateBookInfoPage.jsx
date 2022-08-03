/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './UpdateBookPage.style';
import camera from '../../assets/img/userInterFace/local_see.svg';
import bookApi from '../../util/BookApi';
import { setAllFalse, setTitle, setBack } from '../../app/headerSlice';
import ConfirmPopup from '../../components/Modal/ConfirmPopup';
import SelectPopupBottom from '../../components/Modal/SelectPopupBottom';

const UpdateBookInfoPage = ({ categoryList, bookInfo }) => {
  const [modalTitle, setModalTitle] = useState('');
  const [contentList, setContentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const bookId = bookInfo.id;
  const [bookGrade, setBookGrade] = useState(bookInfo.grade);
  const [bookTitle, setBookTitle] = useState(bookInfo.subject);
  const [bookAuthor, setBookAuthor] = useState(bookInfo.author);
  const [deposit, setDeposit] = useState(bookInfo.deposit);
  const [review, setReview] = useState(bookInfo.content);
  const [bookThumbnail, setBookThumbnail] = useState(bookInfo.thumbnail.imageUrl);
  const [currentCategory, setCurrentCategory] = useState(bookInfo.bookCategory ? bookInfo.bookCategory.id : '');
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState(bookInfo.bookCategory ? bookInfo.bookCategory.name : '');
  const [imgFiles, setImgFiles] = useState([]);
  const [imgPreview, setImgPreview] = useState(bookInfo.bookImages ? bookInfo.bookImages : []);
  const bookGradeList = ['A', 'B', 'C'];
  const [confirmTitle, setConfirmTitle] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirmBtns, setConfirmBtns] = useState();
  const [textCount, setTextCount] = useState(bookInfo.content ? bookInfo.content.length : 0);
  const { updateBook } = bookApi;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle('도서 대여 글쓰기 수정'));
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
    if (!bookTitle && !currentCategory && !bookGrade) {
      alert('도서 제목, 카테고리, 도서 상태 등급은 필수 입력 항목이에요.');
    } else if (imgPreview.length === 0) {
      alert('도서 이미지를 추가해주세요!');
    } else {
      const formData = new FormData();
      formData.append('subject', bookTitle);
      formData.append('author', bookAuthor);
      formData.append('bookCategoryId', currentCategory);
      formData.append('content', review);
      formData.append('deposit', deposit);
      formData.append('grade', bookGrade);
      formData.append('thumbnail', bookThumbnail);
      formData.append('bookImagesJson', JSON.stringify(imgPreview));

      for (let i = 0; i < imgFiles.length; i++) {
        formData.append('imageFiles', imgFiles[i].imageFile);
      }
      //도서 업데이트
      await updateBook(bookId, formData);
      confirmClose();
      navigate(`/detailBook`, { replace: true, state: { id: bookId } });
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

  const saveImage = e => {
    e.preventDefault();
    const files = e.target.files;

    for (let i = 0; i < 3; i++) {
      if (files[i] && imgPreview.length < 3) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[i]);
        fileReader.onload = () => {
          setImgFiles(file => [...file, { imageUrl: fileReader.result, imageFile: files[i] }]);
          setImgPreview(preview => [...preview, { id: 0, imageUrl: fileReader.result }]);
        };
      }
    }
  };

  const onChangeReview = e => {
    if (e.target.value.length <= 500) {
      setReview(e.target.value);
      setTextCount(e.target.value.length);
    }
  };

  const onClickImageRemove = e => {
    const name = e.target.getAttribute('name');

    setImgPreview(imgPreview.filter(item => item.imageUrl !== name));
    setImgFiles(imgFiles.filter(file => file.imageUrl !== name));

    if (bookThumbnail === name) {
      setBookThumbnail('');
    }
  };

  const { Wrapper, ContentsBox, ImageContainer, UplodImgBox, OptionText, ImgBox, SaveButton, VerticalScrollWrapper } = style;

  return (
    <Wrapper>
      <ImageContainer>
        <VerticalScrollWrapper>
          <ImgBox>
            <input type="file" accept="image/*" multiple ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
            <img src={camera} onClick={onChangeImg} alt="" />
            <span>{imgPreview ? imgPreview.length : 0}/3</span>
          </ImgBox>
          {imgPreview
            ? imgPreview.map((preview, index) => {
                return (
                  <UplodImgBox key={index}>
                    <img src={preview.imageUrl ? preview.imageUrl : preview} alt="" />
                    <button id={preview.id} name={preview.imageUrl ? preview.imageUrl : preview} onClick={onClickImageRemove}>
                      x
                    </button>
                  </UplodImgBox>
                );
              })
            : ''}
        </VerticalScrollWrapper>
      </ImageContainer>
      <ContentsBox>
        <input placeholder="도서 제목" value={bookTitle} onChange={e => setBookTitle(e.target.value)} />
        <input placeholder="저자명" value={bookAuthor} onChange={e => setBookAuthor(e.target.value)} />
        <OptionText onClick={() => showCategoryModal()}>{currentCategoryTitle.length > 0 ? currentCategoryTitle : '카테고리'}</OptionText>
        <OptionText onClick={() => showBookGrade()}>{bookGrade ? bookGrade : '책 상태 등급'}</OptionText>
        <input placeholder="보증금" value={deposit} onChange={e => setDeposit(e.target.value)} />
        <textarea placeholder="책에 대한 설명이나 느낀점을 소개해주세요." value={review} onChange={onChangeReview} />
        <span>{textCount}/500</span>
        {showModal && <SelectPopupBottom title={modalTitle} contents={contentList} />}
        <SaveButton onClick={() => onSaveHandler()}>완료</SaveButton>
        {isConfirm && <ConfirmPopup title={confirmTitle} contents={confirmBtns} />}
      </ContentsBox>
    </Wrapper>
  );
};

export default UpdateBookInfoPage;
