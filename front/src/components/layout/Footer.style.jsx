import styled from 'styled-components';

const FooterBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 5.6rem;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: ${({ theme }) => theme.colors.$black3};
  border-top: 1px solid ${({ theme }) => theme.colors.$black3Line};
  text-align: center;
`;
const IconBox = styled.a`
  height: 4rem;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white3};
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
