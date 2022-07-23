/* eslint-disable max-lines-per-function */
import React, { useRef, useState } from 'react';
import style from './SelectedBookInfo.style';
import camera from '../../assets/img/userInterFace/Camera_enhance.png';
import expand_more from '../../assets/img/arrows/expand_more.png';
import ConfirmPopup from '../../components/Modal/ConfirmPopup';
import SelectPopupBottom from '../../components/Modal/SelectPopupBottom';

const SelectedBookInfo = ({ item, categoryList }) => {
  const inputRef = useRef(null);
  const { Wrapper, UploadImg, ImageContainer, InputText, UplodedImg, OptionText, ImgBox, SaveButton, CountImg, VerticalScrollWrapper } = style;
  const { author, description, image, isbn, name, price, publishedDate, publisher } = item;
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState('');
  const [contentList, setContentList] = useState([]);
  const [bookGrade, setBookGrade] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [deposit, setDeposit] = useState();
  const [review, setReview] = useState();
  const [modalTitle, setModalTitle] = useState('');
  const bookGradeList = ['A', 'B', 'C'];

  const onChangeImg = e => {
    e.preventDefault();
    inputRef.current.click();
  };

  const [firstPicPreview, setFirstPicPreview] = useState('');
  const [secondPicPreview, setSecondPicPreview] = useState('');
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
            <input type="file" accept="image/*" multiple capture="camera" ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
            <CountImg>0/3</CountImg>
          </ImgBox>
          <UplodedImg src={image} />
          {firstPicPreview !== '' && <UplodedImg src={firstPicPreview} />}
          {secondPicPreview !== '' && <UplodedImg src={secondPicPreview} />}
        </VerticalScrollWrapper>
      </ImageContainer>
      <InputText value={name}></InputText>
      <InputText value={author}></InputText>
      <InputText value={price}></InputText>
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
