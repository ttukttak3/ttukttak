import styled from 'styled-components';

const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.$black3};
`;

const Section = styled.div`
  color: #fff;
  font-size: 2rem;
  text-align: center;
`;

const layoutStyle = { LayoutBox, Section };

export default layoutStyle;
