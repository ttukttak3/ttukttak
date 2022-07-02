import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBack, setBackHome, setTitle } from '../../../app/headerSlice';
import style from './LoginPage.style';
import utils from '../../../util/ProfileApi';
import loginLogo from '../../../assets/img/logo/Croods_The_Feedback.png';
import naverLogo from '../../../assets/img/logo/naver_logo.png';
import kakaoLogo from '../../../assets/img/logo/kakao_logo.png';
//import Button from '../../../components/Button/Button';

const LoginPage = () => {
  //Header
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBack(true));
    dispatch(setBackHome(false));
    dispatch(setTitle('로그인'));
    return () => {
      // second;
    };
  }, [dispatch]);

  const { naverUrl, kakaoUrl } = utils;
  const { SocialBox, TitleBox, NaverBtn, KaKaoBtn } = style;

  return (
    <SocialBox>
      <TitleBox>
        {/* <Button type="pDefault">Button</Button>
        <Button type="sDefault">Button</Button>
        <Button type="pIconRight">Button</Button>
        <Button type="sIconRight">Button</Button> */}
        <img src={loginLogo} alt="" />
        <p>
          개인책방에 독서가족이 되어 <br />
          인사이트를 나눠보세요
        </p>
      </TitleBox>
      <NaverBtn href={naverUrl}>
        <img src={naverLogo} alt="naver" />
        네이버 로그인
      </NaverBtn>
      <KaKaoBtn href={kakaoUrl}>
        <img src={kakaoLogo} alt="kakao" />
        카카오 로그인
      </KaKaoBtn>
    </SocialBox>
  );
};
export default LoginPage;
