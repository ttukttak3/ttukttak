/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { setBack, setBackHome, setTitle } from '../../../app/headerSlice';
import { setRole, setNickName, setEmail, setImageFile, setHomeTown } from '../../../app/userSlice';
import { getCurrentUser, authApi, authFormApi } from '../../../util/OauthApi';
import style from './ProfilePage.style';
import Popup from '../../../components/Modal/SelectPopupBottom';
import noImg from '../../../assets/img/logo/no_img.png';
const ProfilePage = () => {
  //Header setting
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBack(false));
    dispatch(setBackHome(true));
    dispatch(setTitle('프로필 확인'));
    return () => {
      // second;
    };
  }, [dispatch]);

  const [imgPreview, setImgPreview] = useState('');
  //const navigate = useNavigate();
  //user info setting
  useEffect(() => {
    getCurrentUser()
      .then(response => {
        // if (response.role !== 'USER') {
        //   navigate(`/`);
        // }
        dispatch(setRole(response.role));
        dispatch(setNickName(response.nickname));
        dispatch(setEmail(response.email));
        dispatch(setImageFile(response.imageUrl));
        dispatch(setHomeTown(response.homeTown));
        setImgPreview(response.imageUrl);
      })
      .catch(error => {});
  }, [dispatch]);

  // store 의 상태가 바뀔 때마다 상태를 받아온다.
  const user = useSelector(state => state.user);

  //img change, preview
  const inputRef = useRef(null);
  const [imgFile, setImgFile] = useState('');
  const saveImage = e => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImgFile(e.target.files[0]);
      setImgPreview(fileReader.result);
      setIsShowing(false);
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
  const onDeleteImg = e => {
    e.preventDefault();
    dispatch(setImageFile(''));
    setImgFile('');
    setImgPreview('');
    setIsShowing(false);
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
    formData.append('imageFile', imgFile);
    formData.append('nickname', user.nickName);
    formData.append('townId', id);
    authFormApi
      .post(`/user/signup`, formData)
      .then(response => {
        dispatch(setRole(response.data.role));
        dispatch(setNickName(response.data.nickname));
        dispatch(setEmail(response.data.email));
        dispatch(setImageFile(response.data.imageUrl));
        dispatch(setHomeTown(response.data.homeTown));
      })
      .catch(error => {
        console.log(error);
      });
  };

  //bottom popup
  const [isShowing, setIsShowing] = useState(false);
  const openModal = () => {
    setIsShowing(true);
  };

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const { ProfileBox, ImgBox, ImgChangeBtn, InfoBox, SubmitBtn } = style;
  return (
    <ProfileBox>
      <ImgBox>
        <input type="file" accept="image/*" ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
        <img src={imgPreview} onError={onErrorImg} alt="이미지" />
        <ImgChangeBtn onClick={openModal}></ImgChangeBtn>
      </ImgBox>
      <InfoBox>
        <h4>닉네임</h4>
        <input type="text" value={user.nickName || ''} placeholder="닉네임을 입력하세요." onChange={onChangeNN} className={error && 'errorInput'} />
        <span>{error !== '' ? error : ''}</span>
        <h4>이메일</h4>
        <h6>{user.email}</h6>
      </InfoBox>
      <SubmitBtn onClick={onCheckHandler}>회원가입 완료</SubmitBtn>
      {isShowing && (
        <div>
          <Popup
            title={'프로필 이미지 편집'}
            message1={'갤러리에서 선택'}
            onClick={onChangeImg}
            message2={'카메라로 사진 촬영'}
            onClick1={() => {
              alert('사진촬영');
            }}
            message3={'프로필 이미지 삭제'}
            onClick2={onDeleteImg}
          />
        </div>
      )}
    </ProfileBox>
  );
};

export default ProfilePage;
