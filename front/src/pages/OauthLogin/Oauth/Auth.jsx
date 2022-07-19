/* eslint-disable */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../../util/ApiUtil';
import { useDispatch } from 'react-redux';
import { setUserId, setRole, setNickName, setEmail, setImageFile, setHomeTown } from '../../../app/userSlice';
import utils from '../../../util/ProfileApi';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getCurrentUser } = utils;
  //정규형 변환
  const getToken = name => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(new URL(window.location.href).search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
  //렌더링 후 실행
  useEffect(() => {
    const token = getToken('token');
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);

      //ApiUtil의 token 랜더링을 위한 reload 한번 수행
      if(!window.location.hash) {
          window.location = window.location + '#Auth';
          window.location.reload();
      }

      getCurrentUser().then(result => {
        dispatch(setUserId(result.id));
        dispatch(setRole(result.role));
        dispatch(setNickName(result.nickname));
        dispatch(setEmail(result.email));
        dispatch(setImageFile(result.imageUrl));
        dispatch(setHomeTown(result.homeTown));
        //소셜 로그인 시 user 권한일 경우 history back
        if (result.role === 'USER') {
          //이전 페이지 이동
          navigate(-3);
        } else {
          navigate('/profile');
        }
      });
    }
  }, []);
}

export default Auth;
