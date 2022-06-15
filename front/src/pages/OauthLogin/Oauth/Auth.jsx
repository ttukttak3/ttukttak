import React, { useEffect } from 'react';
import { ACCESS_TOKEN } from '../../../util/OauthApi';
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
    //권한가져와서 권한이 존재할 시 백 없을 시 회원가입 profile
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      navigate('/profile');
    } else {
      //alert('토큰 값이 없습니다!');
    }
  }, [navigate]);

  return <div></div>;
};

export default Auth;
