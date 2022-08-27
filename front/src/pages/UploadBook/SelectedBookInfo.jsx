/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './SelectedBookInfo.style';
import camera from '../../assets/img/userInterFace/local_see.svg';
import ConfirmPopup from '../../components/Modal/ConfirmPopup';
import SelectPopupBottom from '../../components/Modal/SelectPopupBottom';
import noImg from '../../assets/img/logo/postb_default.svg';
import bookApi from '../../util/BookApi';
const SelectedBookInfo = ({ item, categoryList }) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { uploadBook } = bookApi;
  const { Wrapper, UploadImg, ImageContainer, Text, InputText, UplodedImg, OptionText, ImgBox, SaveButton, CountImg, VerticalScrollWrapper, TextArea } = style;
  const { author, description, image, isbn, name, price, publishedDate, publisher } = item;

  const [currentCategory, setCurrentCategory] = useState('');
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState('');
  const [contentList, setContentList] = useState([]);
  const [bookGrade, setBookGrade] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deposit, setDeposit] = useState();
  const [review, setReview] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const bookGradeList = ['A', 'B', 'C'];
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmBtns, setConfirmBtns] = useState();
  const [isConfirm, setIsConfirm] = useState(false);
  const [imgFiles, setImgFiles] = useState([]);
  const [textCount, setTextCount] = useState(description ? review.length : 0);

  const onChangeImg = e => {
    e.preventDefault();
    inputRef.current.click();
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

  const saveBookInfo = async () => {
    if (!currentCategory && !bookGrade) {
      alert('도서 제목, 저자명, 카테고리, 도서 상태 등급은 필수 입력 항목이에요.');
    } else {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('image', image);
      formData.append('isbn', isbn);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('publishedDate', publishedDate);
      formData.append('publisher', publisher);
      formData.append('subject', name);
      formData.append('author', author);
      formData.append('bookCategoryId', currentCategory);
      formData.append('content', review);
      formData.append('deposit', deposit);
      formData.append('grade', bookGrade);
      formData.append('thumbnail', image);

      for (let i = 0; i < imgFiles.length; i++) {
        formData.append('imageFiles', imgFiles[i]);
      }

      const bookId = await uploadBook(formData);
      confirmClose();
      navigate(`/detailBook`, { state: { id: bookId } });
    }
  };

  const [imgPreview, setImgPreview] = useState([]);

  const saveImage = e => {
    e.preventDefault();
    const files = e.target.files;

    for (let i = 0; i < 2; i++) {
      if (files[i] && imgPreview.length < 2) {
        setImgFiles(file => [...file, files[i]]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[i]);
        fileReader.onload = () => {
          setImgPreview(preview => [...preview, fileReader.result]);
        };
      }
    }
  };

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

  const reviewHandler = review => {
    setReview(review);
    setTextCount(review.length);
  };
  // 콤마
  const chgDeposit = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  //close popup
  const modalEl = useRef(null);
  const handleClickOutside = ({ target }) => {
    if (showModal && !modalEl.current.contains(target)) setShowModal(false);
    if (isConfirm && !modalEl.current.contains(target)) setShowModal(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  return (
    <Wrapper ref={modalEl}>
      <ImageContainer>
        <VerticalScrollWrapper>
          <ImgBox>
            <UploadImg src={camera} onClick={onChangeImg}></UploadImg>
            <input type="file" accept="image/*" multiple ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
            <CountImg>{imgPreview.length + 1}/3</CountImg>
          </ImgBox>
          <UplodedImg src={image ? image : ''} onError={onErrorImg} />
          {imgPreview
            ? imgPreview.map((preview, index) => {
                return <UplodedImg key={index} src={preview ? preview : ''} onError={onErrorImg} />;
              })
            : ''}
        </VerticalScrollWrapper>
      </ImageContainer>
      <Text>{name}</Text>
      {author.length > 0 && <Text>{author}</Text>}
      <Text>
        도서 정가<dt>₩{chgDeposit}</dt>
      </Text>
      <OptionText onClick={() => showCategoryModal()}>{currentCategoryTitle.length > 0 ? currentCategoryTitle : '카테고리'}</OptionText>
      <OptionText onClick={() => showBookGrade()}>{bookGrade.length > 0 ? bookGrade : '책 상태 등급'}</OptionText>
      <InputText placeholder="보증금" value={deposit} onChange={e => setDeposit(e.target.value)}></InputText>
      <TextArea>
        <textarea placeholder="책에 대한 설명이나 느낀점을 소개해주세요." value={review} onChange={e => reviewHandler(e.target.value)}></textarea>
        <span>{textCount}/500</span>
      </TextArea>
      {showModal && <SelectPopupBottom title={modalTitle} contents={contentList} />}
      <SaveButton onClick={() => onSaveHandler()}>완료</SaveButton>
      {isConfirm && <ConfirmPopup title={confirmTitle} contents={confirmBtns} />}
    </Wrapper>
  );
};

export default SelectedBookInfo;
