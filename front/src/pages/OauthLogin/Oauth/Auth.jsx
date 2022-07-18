/* eslint-disable */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../../util/ApiUtil';
const Auth = () => {
  //정규형 변환
  const getToken = name => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(new URL(window.location.href).search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
 
  const navigate = useNavigate();
  //렌더링 후 실행
  useEffect(() => {
    const token = getToken('token');
    //token setting 후 ApiUtil이 재 선언 되어야 함 
    //Auth 처음 접근 시 token은 null값으로 getCurrentUser error 발생
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      //프로필 진입 전 AuthCheckRouter를 타기에 AuthCheckRouter로 getCurrentUser 이동
      window.location.replace(`/profile`);
    }
  }, []);

  return <div></div>;
};

export default Auth;
