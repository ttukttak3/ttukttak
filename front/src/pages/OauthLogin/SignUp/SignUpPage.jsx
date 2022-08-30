/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBack, setBackHome, setTitle } from '../../../app/headerSlice';
import { setNickName, setImageFile, setHomeTown } from '../../../app/userSlice';
import profileUtils from '../../../util/ProfileApi';
import locationUtils from '../../../util/LocationApi';
import style from './SignUpPage.style';
import noImg from '../../../assets/img/logo/myb_default.svg';
const SignUpPage = () => {
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
  const { nickNameCheck, signUp } = profileUtils;
  const { getLocation } = locationUtils;
  const onCheckHandler = () => {
    if (!user.nickName) {
      setError('닉네임 입력이 필요합니다.');
      return;
    }
    nickNameCheck(user.nickName).then(result => {
      if (result === true) {
        setError('중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
        return;
      }
      getCurrentLocation();
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          getLocation(position).then(result => {
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
        dispatch(setHomeTown(result.homeTown));
        navigate(`/`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const { SignUpBox, ImgBox, ImgChangeBtn, InfoBox, NickName, Email, SubmitBtn } = style;
  return (
    <SignUpBox>
      <ImgBox>
        <input type="file" accept="image/*" ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
        <img src={imgPreview ? imgPreview : user.imageFile ? user.imageFile : ''} onError={onErrorImg} alt="이미지" />
        <ImgChangeBtn onClick={onChangeImg}></ImgChangeBtn>
      </ImgBox>
      <InfoBox>
        <NickName>
          <h4>닉네임</h4>
          <input type="text" value={user.nickName || ''} placeholder="닉네임을 입력하세요." onChange={onChangeNN} className={error && 'errorInput'} />
          <span>{error !== '' ? error : ''}</span>
        </NickName>
        <Email>
          <h4>이메일</h4>
          <p>{user.email}</p>
        </Email>
      </InfoBox>
      <SubmitBtn onClick={onCheckHandler}>회원가입 완료</SubmitBtn>
    </SignUpBox>
  );
};

export default SignUpPage;
