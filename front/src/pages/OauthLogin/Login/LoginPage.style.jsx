import styled from 'styled-components';

const SocialBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 34rem;
  height: auto;
  margin: 0 auto;
  text-align: center;
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
  background: #03c75a;
  margin-bottom: 2rem;
`;

const KaKaoBtn = styled(SocialBtn)`
  background: #fee500;
`;

const style = { SocialBox, NaverBtn, KaKaoBtn };

export default style;
