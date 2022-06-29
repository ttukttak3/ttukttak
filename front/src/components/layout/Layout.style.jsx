import styled from 'styled-components';

const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
  background: ${({ theme }) => theme.colors.$black3};

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.div`
  color: #fff;
  font-size: 2rem;
  text-align: center;
  margin: 6.4rem 0 5.6rem 0; //header, footer에 가려지지 않도록 밀어내준다.
`;

const layoutStyle = { LayoutBox, Section };

export default layoutStyle;
