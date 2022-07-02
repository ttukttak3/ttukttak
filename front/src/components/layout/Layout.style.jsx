import styled from 'styled-components';

const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  height: auto;
  scrollbar-width: none;
  overflow-y: hidden;
  background: ${({ theme }) => theme.colors.$black3};

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.div`
  color: #fff;
  font-size: 2rem;
  text-align: center;
  height: auto;
  margin: 6.4rem 0 5.6rem 0; //header, footer에 가려지지 않도록 밀어내준다.
  background: ${({ theme }) => theme.colors.$black3};
`;

const layoutStyle = { LayoutBox, Section };

export default layoutStyle;
