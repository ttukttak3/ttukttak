import styled from 'styled-components';

const FooterBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 5.6rem;
  margin-top: auto;
  text-align: center;
`;
const IconBox = styled.a`
  height: 4rem;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: #9aa0a6;
  img {
    display: block;
    margin: 0 auto;
    width: 2.4rem;
    height: 2.4rem;
    margin-bottom: 0.4rem;
  }
`;

const footerStyle = { FooterBox, IconBox };

export default footerStyle;
