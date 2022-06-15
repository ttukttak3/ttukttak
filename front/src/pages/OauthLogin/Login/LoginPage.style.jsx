import styled from 'styled-components';

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
  margin: 0 auto 11.9rem auto;
  position: relative;

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
  font-weight: 400;
  font-size: 1.6rem;
  border-radius: 0.4rem;

  img {
    float: left;
    width: 1.7rem;
    height: 1.7rem;
    margin: 1.6rem 0 0 1.9rem;
  }

  ::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const NaverBtn = styled(SocialBtn)`
  background: ${({ theme }) => theme.colors.$Naver};
  margin-bottom: 2rem;
`;

const KaKaoBtn = styled(SocialBtn)`
  background: ${({ theme }) => theme.colors.$KaKao};
`;

const style = { SocialBox, TitleBox, NaverBtn, KaKaoBtn };

export default style;
