/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBack, setBackHome, setTitle } from '../../../app/headerSlice';
import style from './ProfilePage.style';
import { getCurrentUser, checkNickName } from '../../../util/OauthApi';
//권한을 받아서 게스트 일 시 회원가입 버튼 & back 시 로그인 창 <- 이럼 또 로그인에서가 문제가 되네
//멤바일 시 수정 버튼 & back 시 홈으로 이동
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
  }, []);

  //profile 정보 세팅
  const [currentUser, setCurrentUser] = useState('');
  const [nickName, setNickName] = useState('');
  const onChange = e => {
    setNickName(e.target.value);
  };
  useEffect(() => {
    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
        setNickName(response.name);
      })
      .catch(error => {
        setCurrentUser('');
      });
  }, []);

  //회원가입 완료 버튼
  const onCheckHandler = () => {
    //닉네임 중복 체크(OauthApi)
    //return 중복일 시 true 아닐 시 false 반환
    checkNickName(nickName)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(response);
      });
  };

  //스타일
  const { ProfileBox, ImgBox, InfoBox, SubmitBtn } = style;
  return (
    <ProfileBox>
      <ImgBox>
        <img src={currentUser.imageUrl} alt="profileImg" />
      </ImgBox>
      <InfoBox>
        <h4>닉네임</h4>
        <input type="text" value={nickName} placeholder="닉네임을 입력하세요." onChange={onChange} />
        <h4>이메일</h4>
        <h6>{currentUser.email}</h6>
      </InfoBox>
      <SubmitBtn onClick={onCheckHandler}>회원가입 완료</SubmitBtn>
    </ProfileBox>
  );
};

export default ProfilePage;
