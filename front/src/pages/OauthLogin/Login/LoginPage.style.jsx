import styled from 'styled-components';
import naverLogo from '../../../assets/img/logo/naver_logo.svg';
import kakaoLogo from '../../../assets/img/logo/kakao_logo.svg';

const SocialBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 34rem;
  height: auto;
  margin: 0 auto;
  text-align: center;
`;
const TitleBox = styled.div`
  width: 25rem;
  margin: 0 auto 10.3rem auto;
  position: relative;
  img {
    max-width: 25rem;
    width: 100%;
    height: auto;
  }
  p {
    width: 21rem;
    position: absolute;
    left: 50%;
    bottom: -1.6rem;
    margin-left: -10.5rem;
    font-size: 1.6rem;
    line-height: 2.3rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
  }
`;
const SocialBtn = styled.a`
  height: 5rem;
  line-height: 5rem;
  border-radius: 0.4rem;
  font-weight: 400;
  font-size: 1.7rem;
  letter-spacing: -0.2rem;
  text-align: left;
  padding-left: 13.8rem;
`;

const NaverBtn = styled(SocialBtn)`
  background: ${({ theme }) => theme.colors.$Naver} url(${naverLogo}) 2rem 1.6rem no-repeat;
  color: ${({ theme }) => theme.colors.$white1};
  margin-bottom: 2rem;
`;

const KaKaoBtn = styled(SocialBtn)`
  background: ${({ theme }) => theme.colors.$KaKao} url(${kakaoLogo}) 1.8rem 1.5rem no-repeat;
  color: ${({ theme }) => theme.colors.$black5};
  margin-bottom: 1.4rem;
`;

const Noti = styled.p`
  margin-bottom: 10.7rem;
  width: 34rem;
  font-size: 1.2rem;
  line-height: 1.8rem;
  text-align: left;
  color: #9aa0a6;
  &.bottom {
    margin-bottom: 0;
    position: absolute;
    bottom: 2rem;
  }
  button {
    font-size: 1.2rem;
    text-decoration: underline;
    color: #9aa0a6;
    vertical-align: text-top;
  }
`;

const style = { SocialBox, TitleBox, NaverBtn, KaKaoBtn, Noti };

export default style;
