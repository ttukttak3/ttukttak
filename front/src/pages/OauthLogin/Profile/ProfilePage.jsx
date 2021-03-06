/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBack, setBackHome, setTitle } from '../../../app/headerSlice';
import { setNickName, setImageFile } from '../../../app/userSlice';
import utils from '../../../util/ProfileApi';
import style from './ProfilePage.style';
import noImg from '../../../assets/img/logo/no_img.png';
const ProfilePage = () => {
  //Header setting
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(setBack(false));
    dispatch(setBackHome(true));
    dispatch(setTitle('프로필 확인'));
    return () => {
      // second;
    };
  }, [dispatch]);

  //img change, preview
  const inputRef = useRef(null);
  const [imgFile, setImgFile] = useState('');
  const [imgPreview, setImgPreview] = useState('');
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
    dispatch(setNickName(e.target.value));
    setError('');
  };

  //img delete
  // const onDeleteImg = e => {
  //   e.preventDefault();
  //   dispatch(setImageFile(''));
  //   setImgFile('');
  //   setImgPreview('');
  // };

  //check
  const { nickNameCheck, locationValue, signUp } = utils;
  const onCheckHandler = () => {
    if (user.nickName === '') {
      setError('닉네임 입력이 필요합니다.');
      return;
    }
    nickNameCheck(user.nickName).then(result => {
      if (result === true) {
        setError('중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
        return;
      }
      getLocation();
    });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          locationValue(position).then(result => {
            submit(result.id);
          });
        },
        function (error) {
          console.error(error);
          submit('');
        },
      );
    }
  };

  const submit = id => {
    const formData = new FormData();
    formData.append('imageFile', imgFile);
    formData.append('nickname', user.nickName);
    formData.append('townId', id);
    signUp(formData)
      .then(result => {
        dispatch(setImageFile(result.imageUrl));
        navigate(`/`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const { ProfileBox, ImgBox, ImgChangeBtn, InfoBox, SubmitBtn } = style;
  return (
    <ProfileBox>
      <ImgBox>
        <input type="file" accept="image/*" ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
        <img src={imgPreview === '' ? user.imageFile : imgPreview} onError={onErrorImg} alt="이미지" />
        <ImgChangeBtn onClick={onChangeImg}></ImgChangeBtn>
      </ImgBox>
      <InfoBox>
        <h4>닉네임</h4>
        <input type="text" value={user.nickName || ''} placeholder="닉네임을 입력하세요." onChange={onChangeNN} className={error && 'errorInput'} />
        <span>{error !== '' ? error : ''}</span>
        <h4>이메일</h4>
        <h6>{user.email}</h6>
      </InfoBox>
      <SubmitBtn onClick={onCheckHandler}>회원가입 완료</SubmitBtn>
    </ProfileBox>
  );
};

export default ProfilePage;
