/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { setBack, setBackHome, setTitle } from '../../../app/headerSlice';
import { setNickName, setEmail, setImageFile, setImagePreview } from '../../../app/userSlice';
import { getCurrentUser, authApi, authFormApi } from '../../../util/OauthApi';
import style from './ProfilePage.style';
import Popup from '../../../components/Modal/SelectPopupBottom';

const ProfilePage = () => {
  //Header
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBack(false));
    dispatch(setBackHome(true));
    dispatch(setTitle('프로필 확인'));
    return () => {
      // second;
    };
  }, [dispatch]);

  const [error, setError] = useState('');
  //const navigate = useNavigate();
  //oauth info setting
  useEffect(() => {
    //로그인체크 getLoginCheck();
    getCurrentUser()
      .then(response => {
        // if (response.role === 'USER') {
        //   navigate(`/`);
        // }
        dispatch(setNickName(response.nickname));
        dispatch(setEmail(response.email));
        dispatch(setImageFile(response.imageUrl));
        dispatch(setImagePreview(response.imageUrl));
      })
      .catch(error => {
        setUserInfo('');
      });
  }, [dispatch]);

  // store 의 상태가 바뀔 때마다 상태를 받아온다.
  const user = useSelector(state => state.user);

  //img change, preview
  const inputRef = useRef(null);
  const saveImage = e => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      dispatch(setImageFile(e.target.files[0]));
      dispatch(setImagePreview(fileReader.result));
    };
  };

  //img change
  const onChangeImg = e => {
    e.preventDefault();
    inputRef.current.click();
  };

  //nickname change
  const onChangeNN = e => {
    dispatch(setNickName(e.target.value));
    setError('');
  };

  //check
  const onCheckHandler = () => {
    if (user.nickName === '') {
      setError('닉네임 입력이 필요합니다.');
      return;
    }
    authApi
      .get(`/user/chknickname?nickname=${user.nickName}`)
      .then(response => {
        if (response.data === true) {
          setError('중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
        } else {
          console.log('실행됨');
          getLocation();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          authApi
            .get(`/api/address/location?latitude=${position.coords.latitude.toString()}&longitude=${position.coords.longitude.toString()}`)
            .then(response => {
              signUp(response.data.id);
            })
            .catch(error => {
              console.log(error);
            });
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        },
      );
    }
  };

  const signUp = id => {
    const formData = new FormData();
    formData.append('imageFile', user.imageFile);
    formData.append('nickname', user.nickName);
    formData.append('townId', id);
    authFormApi
      .post(`/user/signup`, formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  //바텀 팝업 (작업해야 함 5초 후 자동 끄기)
  const [isShowing, setIsShowing] = useState(false);
  const openModal = () => {
    setIsShowing(true);
  };
  useEffect(() => {
    if (isShowing) {
      const notiTimer = setTimeout(() => {
        setIsShowing(false);
      }, 5000);
      return () => clearTimeout(notiTimer);
    }
  }, [isShowing]);

  //스타일
  const { ProfileBox, ImgBox, ImgChangeBtn, InfoBox, SubmitBtn } = style;
  return (
    <ProfileBox>
      <ImgBox>
        <input type="file" accept="image/*" ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
        <img src={user.imagePreview} alt="profileImg" />
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
      <button onClick={openModal}>Open modal</button>
      <div>{isShowing && <Popup message="This is Modal" />}</div>
    </ProfileBox>
  );
};

export default ProfilePage;
