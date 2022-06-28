/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { setBack, setBackHome, setTitle } from '../../../app/headerSlice';
import { getCurrentUser, authApi, authFormApi } from '../../../util/OauthApi';
import style from './ProfilePage.style';
import SelectPopupB from '../../../components/Modal/SelectPopupBottom';

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

  //state 선언
  const [userInfo, setUserInfo] = useState({
    imageFile: '',
    imagePreview: '',
    nickName: '',
    email: '',
  });
  const [error, setError] = useState('');
  //const navigate = useNavigate();
  //oauth info setting
  useEffect(() => {
    //로그인체크 getLoginCheck();
    getCurrentUser()
      .then(response => {
        // 권한임 이거 풀어야 유저면 홈으로 이동!
        // if (response.role === 'USER') {
        //   navigate(`/`);
        // }
        setUserInfo({
          imageFile: response.imageUrl,
          imagePreview: response.imageUrl,
          nickName: response.nickname,
          email: response.email,
        });
      })
      .catch(error => {
        setUserInfo('');
      });
  }, []);

  const inputRef = useRef(null);
  //img change, preview
  const saveImage = e => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      console.log(fileReader.result);
      setUserInfo(prevState => {
        return { ...prevState, imageFile: e.target.files[0], imagePreview: fileReader.result };
      });
    };
  };

  //img change
  const onChangeImg = e => {
    e.preventDefault();
    inputRef.current.click();
  };

  //nickname change
  const onChangeNN = e => {
    setUserInfo(prevState => {
      return { ...prevState, nickName: e.target.value };
    });
    setError('');
  };

  //check
  const onCheckHandler = () => {
    if (userInfo.nickName === '') {
      setError('닉네임 입력이 필요합니다.');
      return;
    }
    authApi
      .get(`/user/chknickname?nickname=${userInfo.nickName}`)
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
    formData.append('imageFile', userInfo.imageFile);
    formData.append('nickname', userInfo.nickName);
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
        <img src={userInfo.imagePreview} alt="profileImg" />
        <ImgChangeBtn onClick={onChangeImg}></ImgChangeBtn>
      </ImgBox>
      <InfoBox>
        <h4>닉네임</h4>
        <input type="text" value={userInfo.nickName || ''} placeholder="닉네임을 입력하세요." onChange={onChangeNN} className={error && 'errorInput'} />
        <span>{error !== '' ? error : ''}</span>
        <h4>이메일</h4>
        <h6>{userInfo.email}</h6>
      </InfoBox>
      <SubmitBtn onClick={onCheckHandler}>회원가입 완료</SubmitBtn>
      <button onClick={openModal}>Open modal</button>
      <div>{isShowing && <SelectPopupB message="This is Modal" />}</div>
    </ProfileBox>
  );
};

export default ProfilePage;
