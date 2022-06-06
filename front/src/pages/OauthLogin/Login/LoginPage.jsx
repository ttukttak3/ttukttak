import React from 'react';
import style from './LoginPage.style';
import { NAVER_AUTH_URL, KAKAO_AUTH_URL } from '../../../util/OauthApi';
import naverLogo from '../../../assets/img/logo/naver_logo.png';
import kakaoLogo from '../../../assets/img/logo/kakao_logo.png';

const LoginPage = () => {
  const { SocialBox, NaverBtn, KaKaoBtn } = style;
  return (
    <SocialBox>
      <NaverBtn href={NAVER_AUTH_URL}>
        <img src={naverLogo} alt="naver" />
        네이버 로그인
      </NaverBtn>
      <KaKaoBtn href={KAKAO_AUTH_URL}>
        <img src={kakaoLogo} alt="kakao" />
        카카오 로그인
      </KaKaoBtn>
    </SocialBox>
  );
};
export default LoginPage;
