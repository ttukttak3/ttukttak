import React from 'react';
import styled from 'styled-components';
import OauthTemplate from '../../../styles/OauthTemplate';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, NAVER_AUTH_URL, KAKAO_AUTH_URL } from '../../../util/OauthApi';
import fbLogo from '../img/fb-logo.png';
import googleLogo from '../img/google-logo.png';
import naverLogo from '../img/naver-logo.png';
import kakaoLogo from '../img/kakao-logo.png';

const SocialBox = styled.div`
  display: block;
  height: auto;
`;

const SocialBtn = styled.a`
  display: block;
  text-align: center;
  border: 1px solid #efefef;
  height: 45px;
  line-height: 45px;
  margin-bottom: 15px;
  padding: 0 15px;
  font-weight: 400;
  font-size: 16px;

  :hover {
    color: #2098f3;
  }
  img {
    float: left;
    width: 30px;
    height: 30px;
    margin-top: 8px;
  }
`;
const LoginPage = () => (
  <OauthTemplate>
    <SocialBox>
      <SocialBtn href={GOOGLE_AUTH_URL}>
        <img src={googleLogo} alt="Google" />
        Google Login
      </SocialBtn>
      <SocialBtn href={FACEBOOK_AUTH_URL}>
        <img src={fbLogo} alt="facebook" />
        facebook Login
      </SocialBtn>
      <SocialBtn href={NAVER_AUTH_URL}>
        <img src={naverLogo} alt="naver" />
        naver Login
      </SocialBtn>
      <SocialBtn href={KAKAO_AUTH_URL}>
        <img src={kakaoLogo} alt="kakao" />
        kakao Login
      </SocialBtn>
    </SocialBox>
  </OauthTemplate>
);

export default LoginPage;
