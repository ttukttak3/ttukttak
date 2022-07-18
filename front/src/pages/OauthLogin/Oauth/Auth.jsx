/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../../util/ApiUtil';
import utils from '../../../util/ProfileApi';
import { setUserId, setRole, setNickName, setEmail, setImageFile, setHomeTown } from '../../../app/userSlice';
const Auth = () => {
  //정규형 변환
  const getToken = name => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(new URL(window.location.href).search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
  const { getCurrentUser } = utils;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //렌더링 후 실행
  useEffect(() => {
    const token = getToken('token');
    //token setting
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      getCurrentUser().then(result => {
        dispatch(setUserId(result.id));
        dispatch(setRole(result.role));
        dispatch(setNickName(result.nickname));
        dispatch(setEmail(result.email));
        dispatch(setImageFile(result.imageUrl));
        dispatch(setHomeTown(result.homeTown));
      });
      navigate(`/profile`);
    }
  }, [dispatch, getCurrentUser]);

  return <div></div>;
};

export default Auth;
