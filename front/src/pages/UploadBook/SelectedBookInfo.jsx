/* eslint-disable max-lines-per-function */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './SelectedBookInfo.style';
import camera from '../../assets/img/userInterFace/Camera_enhance.png';
import expand_more from '../../assets/img/arrows/expand_more.png';
import ConfirmPopup from '../../components/Modal/ConfirmPopup';
import SelectPopupBottom from '../../components/Modal/SelectPopupBottom';
import bookApi from '../../util/BookApi';
const SelectedBookInfo = ({ item, categoryList }) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { uploadBook } = bookApi;
  const { Wrapper, UploadImg, ImageContainer, Text, InputText, UplodedImg, OptionText, ImgBox, SaveButton, CountImg, VerticalScrollWrapper } = style;
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

  return (
    <Wrapper>
      <ImageContainer>
        <VerticalScrollWrapper>
          <ImgBox>
            <UploadImg src={camera} onClick={onChangeImg}></UploadImg>
            <input type="file" accept="image/*" multiple ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
            <CountImg>{imgPreview.length + 1}/3</CountImg>
          </ImgBox>
          <UplodedImg src={image} />
          {imgPreview ? (
            imgPreview.map((preview, index) => {
              return <UplodedImg key={index} src={preview} />;
            })
          ) : (
            <span></span>
          )}
        </VerticalScrollWrapper>
      </ImageContainer>
      <Text>{name}</Text>
      <Text>{author}</Text>
      <Text>
        도서 정가<dt>₩{price}</dt>
      </Text>
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

export default SelectedBookInfo;
