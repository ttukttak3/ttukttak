/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { setBackHome, setTitle, setAllFalse } from '../../../app/headerSlice';
import style from './LoginPage.style';
import { ACCESS_TOKEN } from '../../../util/ApiUtil';
import utils from '../../../util/ProfileApi';
import loginLogo from '../../../assets/img/logo/Croods_The_Feedback.svg';
//import Button from '../../../components/Button/Button';
const LoginPage = () => {
  //Header
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = createBrowserHistory();
  useEffect(() => {
    //로그인 페이지 진입은 토큰의 문제가 있는 경우(만료 등)라 판단하여 토큰을 지우고 로그인하여 재 할당 받는다.
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(setAllFalse());
    dispatch(setBackHome(true));
    dispatch(setTitle('로그인'));
    return () => {
      history.listen(() => {
        if (history.action === 'POP') {
          if (localStorage.getItem('town')) {
            navigate('/');
          } else {
            navigate('/location/1111011900');
          }
        }
      });
    };
  }, [dispatch, navigate, history]);

  const { naverUrl, kakaoUrl } = utils;
  const { SocialBox, TitleBox, NaverBtn, KaKaoBtn, Noti } = style;

  return (
    <SocialBox>
      <TitleBox>
        {/* <Button type="pDefault">Button</Button>
        <Button type="sDefault">Button</Button>
        <Button type="pIconRight">Button</Button>
        <Button type="sIconRight">Button</Button> */}
        <object type="image/svg+xml" data={loginLogo} aria-label="로그인 이미지"></object>
        {/* <img src={loginLogo} alt="" /> */}
        <p>
          개인책방에 독서가족이 되어 <br />
          인사이트를 나눠보세요
        </p>
      </TitleBox>
      <NaverBtn href={naverUrl}>네이버 로그인</NaverBtn>
      <KaKaoBtn href={kakaoUrl}>카카오 로그인</KaKaoBtn>
      <Noti>&nbsp;&nbsp;* 카카오 로그인 시, 카카오계정(이메일)을 필수로 체크해주세요.</Noti>
      <Noti className="bottom">
        회원가입 시, 저희 서비스의 <button onClick={() => navigate('/account/setting/terms')}>이용약관</button>과&nbsp;
        <button onClick={() => navigate('/account/setting/information')}>개인정보처리방침</button>에 동의한 것으로 간주합니다. 개인책방 서비스는 만 14세 이상 회원만 가입 가능합니다.
      </Noti>
    </SocialBox>
  );
};
export default LoginPage;
