/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBack, setSettings, setTitle, setAllFalse } from '../../../app/headerSlice';
import { setUserId, setRole, setNickName, setEmail, setImageFile, setIntroduction, setHomeTown } from '../../../app/userSlice';
import utils from '../../../util/ProfileApi';
import style from './ProfilePage.style';
import noImg from '../../../assets/img/logo/myb_default.svg';
const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nickNameCheck, setProfile } = utils;
  //setting - header
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle('프로필 편집'));
    dispatch(setSettings(false));
    return () => {
      // second;
    };
  }, [dispatch]);
  //setting - localStorage 값 없으면 user slice data : 있으면 localStorage data
  const user = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState({
    nickName: localStorage.getItem('backNickName') === null ? user.nickName : localStorage.getItem('backNickName'),
    introduction: localStorage.getItem('backIntroduction') === null ? (user.introduction ? user.introduction : '') : localStorage.getItem('backIntroduction'),
    townId: localStorage.getItem('backTownId') === null ? user.homeTown.town.id : localStorage.getItem('backTownId'),
    longAddress: localStorage.getItem('backAddress') === null ? user.homeTown.town.longAddress : localStorage.getItem('backAddress'),
  });

  //img change, preview
  const inputRef = useRef(null);
  const [imgFile, setImgFile] = useState('');
  const [imgPreview, setImgPreview] = useState(localStorage.getItem('backImgPreview') === null ? '' : localStorage.getItem('backImgPreview'));
  const saveImage = e => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImgFile(e.target.files[0]);
      setImgPreview(fileReader.result);
    };
  };
  //img change
  const onChangeImg = e => {
    e.preventDefault();
    inputRef.current.click();
  };
  //nickname change
  const [error, setError] = useState('');
  const onChangeNN = e => {
    setUserInfo({
      ...userInfo,
      nickName: e.target.value,
    });
    setError('');
  };
  //introduction change
  const [textCount, setTextCount] = useState(user.introduction ? user.introduction.length : 0);
  const onChangeIntroduction = e => {
    if (e.target.value.length <= 100) {
      setUserInfo({
        ...userInfo,
        introduction: e.target.value,
      });
      setTextCount(e.target.value.length);
    }
  };
  //check
  const onCheckHandler = () => {
    if (userInfo.nickName === '') {
      setError('닉네임 입력이 필요합니다.');
      return;
    }
    nickNameCheck(userInfo.nickName).then(result => {
      if (result === true) {
        setError('중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
        return;
      }
      submit();
    });
  };

  //위치 선택 후 프로필 수정 데이터 유지
  const historyBack = () => {
    localStorage.setItem('backNickName', userInfo.nickName);
    localStorage.setItem('backIntroduction', userInfo.introduction);
    localStorage.setItem('backTownId', userInfo.townId);
    localStorage.setItem('backAddress', userInfo.longAddress);
    localStorage.setItem('backImgPreview', imgPreview);
    navigate(`/location/${userInfo.townId}`);
  };

  const submit = () => {
    //base64 to File(위치 선택 후 이전 이미지 파일)
    let file = '';
    if (localStorage.getItem('backImgPreview')) {
      let arr = localStorage.getItem('backImgPreview').split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      file = new File([u8arr], 'name.png', { type: mime });
    }

    const formData = new FormData();
    formData.append('imageFile', file ? file : imgFile);
    formData.append('nickname', userInfo.nickName);
    formData.append('introduction', userInfo.introduction);
    formData.append('townId', userInfo.townId);
    setProfile(formData)
      .then(result => {
        dispatch(setUserId(result.id));
        dispatch(setRole(result.role));
        dispatch(setNickName(result.nickname));
        dispatch(setEmail(result.email));
        dispatch(setImageFile(result.imageUrl));
        dispatch(setHomeTown(result.homeTown));
        dispatch(setIntroduction(result.introduction));
        navigate('/account');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const { ProfileBox, ImgBox, ImgChangeBtn, InfoBox, NickName, Email, Introduction, Location, SubmitBtn } = style;
  return (
    <ProfileBox>
      <ImgBox>
        <input type="file" accept="image/*" ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
        <img src={imgPreview === '' ? user.imageFile : imgPreview} onError={onErrorImg} alt="이미지" />
        <ImgChangeBtn onClick={onChangeImg}></ImgChangeBtn>
      </ImgBox>
      <InfoBox>
        <NickName>
          <h4>닉네임</h4>
          <input type="text" value={userInfo.nickName || ''} placeholder="닉네임을 입력하세요." onChange={onChangeNN} className={error && 'errorInput'} />
          <span>{error !== '' ? error : ''}</span>
        </NickName>
        <Email>
          <h4>이메일</h4>
          <p>{user.email}</p>
        </Email>
        <Introduction>
          <h4>나의 책방 소개글</h4>
          <textarea placeholder="소개글을 입력해 주세요." onChange={onChangeIntroduction} value={userInfo.introduction} />
          <span>{textCount}/100</span>
        </Introduction>
        <Location>
          <h4>위치 정보 설정</h4>
          <h6>{userInfo.longAddress}</h6>
          <button onClick={historyBack}>위치 정보 변경</button>
        </Location>
      </InfoBox>
      <SubmitBtn onClick={onCheckHandler}>저장</SubmitBtn>
    </ProfileBox>
  );
};

export default ProfilePage;
