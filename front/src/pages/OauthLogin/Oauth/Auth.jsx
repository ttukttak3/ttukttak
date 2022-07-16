/* eslint-disable */
import React, { useEffect } from 'react';
import { ACCESS_TOKEN } from '../../../util/ApiUtil';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
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
    //token setting
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      window.location.replace('/profile');
      //navigate('/'); //이전 페이지를 기억하고 있다가 보내야함
    } else {
      //navigate('/login');
    }
  }, []);

  return <div></div>;
};

export default Auth;
