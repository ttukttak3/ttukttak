import React from 'react';
import OauthTemplate from '../styles/OauthTemplate';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../util/OauthApi';

const Main = () => {
  console.log(localStorage.getItem(ACCESS_TOKEN));
  return (
    <OauthTemplate>
      {localStorage.getItem(ACCESS_TOKEN) !== null ? (
        <div>
          <Link to="/profile">프로필</Link>
          <Link to="/">로그아웃</Link>
        </div>
      ) : (
        <Link to="/login">로그인</Link>
      )}
    </OauthTemplate>
  );
};

export default Main;
